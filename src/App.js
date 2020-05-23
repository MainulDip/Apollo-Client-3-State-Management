import React, { useState, useEffect } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache
} from '@apollo/client'
import { persistCache } from 'apollo-cache-persist'
import { ItemsForPurchase } from './components/ItemsForPurchase'
import { UserCart } from './components/UserCart'
import { available_items } from './api'
import { resolvers } from './resolvers'
// import { QUERY_AVAILABLE_ITEMS } from './components/ItemsForPurchase'
// import {Test} from './Test'

const cache = new InMemoryCache({})

const client = new ApolloClient({
  cache: cache,
  resolvers: resolvers
})

// cache.writeQuery({
//   query: gql`
//     query {
//       cart {
//         items
//         total
//       }
//       currency
//       itemsForSale {
//         id
//         title
//         thumbnail_url
//         price
//       }
//     }
//   `,
//   data: {
//     cart: {
//       items: [],
//       total: 0,
//       __typename: 'Cart'
//     },
//     currency: 'USD',
//     itemsForSale: available_items
//   }
// })

cache.writeQuery({
  query: gql`
    query {
      cart {
        items_counter {
          id
          title
          thumbnail_url
          price
          counter
        }
        items
        total
      }
      currency
      itemsForSale {
        id
        title
        thumbnail_url
        price
      }
    }
  `,
  data: {
    cart: {
      items_counter: [],
      items: [],
      total: 0,
      __typename: 'Cart'
    },
    currency: 'USD',
    itemsForSale: available_items
  }
})

// async function setupPersistence () {
//   try {
//     await persistCache({
//       cache: cache,
//       storage: window.localStorage
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

export function App () {
  // const [hydrated, setHydrated] = useState(false)

  // useEffect(() => {
  //   setupPersistence().finally(() => setHydrated(true))
  // }, [])

  // if (!hydrated) return <p>loading our persisted cache...</p>

  return (
    <ApolloProvider client={client}>
      <div className='mx-w-full'>
        <h2 className='p-6 bg-gray-200 text-center'>
          Apollo Client (V3): State Management + Persist Cache
        </h2>
        <div className='flex  m-4'>
          <div className='w-3/4 mr-4'>
            <h1 className='p-4 bg-green-200 inline-block mt-2 mb-4 ml-2'>
              Shop Now
            </h1>
            <ItemsForPurchase /> {/* component */}
          </div>
          <div className='w-1/4 flex flex-col self-start shadow-xs'>
            <UserCart /> {/* component */}
          </div>
        </div>
      </div>
    </ApolloProvider>
  )
}
