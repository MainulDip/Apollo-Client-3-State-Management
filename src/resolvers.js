import { QUERY_CART_INFO } from './components/UserCart'
import { QUERY_AVAILABLE_ITEMS } from './components/ItemsForPurchase'
import { convertPrice } from './util'
import { gql } from '@apollo/client'

export const resolvers = {
  Mutation: {
    addItemToCart: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO })

      const { itemsForSale } = cache.readQuery({ query: QUERY_AVAILABLE_ITEMS })

      const newItem = itemsForSale.find(item => item.id === args.id)

      const newItemWithCounters = {
        ...newItem,
        counter:
          cart.items.filter(a => {
            return a.id == newItem.id
          }).length + 1,
        __typename: 'Items_Counters'
      }

      const insertUnique = () => {
        if (cart.items_counter) {
          if (
            cart.items_counter.filter(item => {
              return item.id == newItem.id
            }).length
          ) {
            // remove old object using filter then concat
            let itemIndex = cart.items_counter.findIndex(
              item => item.id == newItemWithCounters.id
            )
            let new_items_counters = [...cart.items_counter]
            new_items_counters.splice(itemIndex, 1, newItemWithCounters)
            return new_items_counters
          } else {
            return cart.items_counter.concat(newItemWithCounters)
          }
        }
      }

      cache.writeQuery({
        query: QUERY_CART_INFO,
        data: {
          cart: {
            items_counter: cart.items_counter
              ? insertUnique()
              : cart.items_counter.concat(newItemWithCounters),
            items: cart.items.concat(newItem),
            total: cart.total + newItem.price,
            __typename: 'Cart'
          }
        }
      })

      return newItem
    },
    removeFromCart: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO })

      const { itemsForSale } = cache.readQuery({ query: QUERY_AVAILABLE_ITEMS })

      const removeItem = itemsForSale.find(item => item.id === args.id)

      const toremovefromcounter = cart.items_counter.find(
        item => item.id == args.id
      )

      const newCounter = () => {
        if (toremovefromcounter.counter > 0) {
          let newObj = {
            ...toremovefromcounter,
            counter: toremovefromcounter.counter - 1
          }
          return removeFromItemArray(cart.items_counter, newObj, true)
        }
      }

      const removeFromItemArray = (array, object, counter = false) => {
        if (counter && object.counter > 0) {
          let itemIndex = array.findIndex(item => item.id == args.id)
          let newArray = [...array]
          newArray.splice(itemIndex, 1, object)
          return newArray
        } else {
          let itemIndex = array.findIndex(item => item.id == args.id)
          let newArray = [...array]
          newArray.splice(itemIndex, 1)
          return newArray
        }
      }

      cache.writeQuery({
        query: QUERY_CART_INFO,
        data: {
          cart: {
            items_counter: newCounter(),
            items: removeFromItemArray(cart.items),
            total: cart.total - removeItem.price,
            __typename: 'Cart'
          }
        }
      })
    },
    async convertCurrency (_, { newCurrency }, { cache }) {
      const {
        currency,
        cart: { items_counter, items, total }
      } = cache.readQuery({ query: QUERY_CART_INFO })

      const { itemsForSale } = cache.readQuery({ query: QUERY_AVAILABLE_ITEMS })

      const itemsWithConvertedPricing = await Promise.all(
        itemsForSale.map(async item => ({
          ...item,
          price: await convertPrice(currency, newCurrency, item.price)
        }))
      )

      cache.writeQuery({
        query: gql`
          query {
            cart {
              items_counter
              items
              total
            }
            currency
            itemsForSale
          }
        `,
        data: {
          itemsForSale: itemsWithConvertedPricing,
          cart: {
            items_counter,
            items,
            total: await convertPrice(currency, newCurrency, total),
            __typename: 'Cart'
          },
          currency: newCurrency
        }
      })
      console.log('worked')

      return newCurrency
    }
  }
}
