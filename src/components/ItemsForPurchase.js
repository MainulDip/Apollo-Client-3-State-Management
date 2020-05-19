import React from 'react'
import { useQuery, gql } from '@apollo/client'
//
import { Item } from './Item'

export const QUERY_AVAILABLE_ITEMS = gql`
  query {
    itemsForSale @client {
      id
      title
      thumbnail_url
      price
    }
  }
`

// render all items available in our demo store
export function ItemsForPurchase () {
  const { data } = useQuery(QUERY_AVAILABLE_ITEMS)
  console.log(data.itemsForSale)
  return (
    <>
      <div className='flex flex-wrap'>
        {data &&
          data.itemsForSale.map((item, index) => (
            <div  key={index} className='flex flex-col align-middle flex-wrap justify-center lg:w-1/6 sm:w-1/5 w-2/5 text-center border border-2 m-2'>
              <Item {...item} />
            </div>
          ))}
      </div>
    </>
  )
}
