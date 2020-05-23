// mock api data
import {hat, bag, shoe, tshirt, jeans} from './assets/images'
export const available_items = [
  {
    id: 'hat_1',
    title: 'Hat',
    thumbnail_url: hat,
    price: 20,
    __typename: 'Item'
  },
  {
    id: 'tshirt_1',
    title: 'T-Shirt',
    thumbnail_url: tshirt,
    price: 15,
    __typename: 'Item'
  },
  {
    id: 'jeans_1',
    title: 'Jeans',
    thumbnail_url: jeans,
    price: 30,
    __typename: 'Item'
  },
  {
    id: 'shoes_1',
    title: 'Shoes',
    thumbnail_url: shoe,
    price: 75,
    __typename: 'Item'
  },
  {
    id: 'backpack_1',
    title: 'Backpack',
    thumbnail_url: bag,
    price: 25,
    __typename: 'Item'
  }
]
