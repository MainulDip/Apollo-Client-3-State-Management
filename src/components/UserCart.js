import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Counter from './Counter'
import { CurrencyButtons } from './CurrencyButtons'

export const QUERY_CART_INFO = gql`
  query {
    cart @client {
      items_counter {
        id
        title
        thumbnail_url
        price
        counter
      }
      items {
        id
        title
        thumbnail_url
        price
      }
      total
    }
    currency @client
  }
`

export function UserCart () {
  const { data } = useQuery(QUERY_CART_INFO)
  // console.log(data)

  return (
    <>
      <h1 className='text-center py-2 bg-gray-200'>Your Cart</h1>
      <div
        className='py-2 px-6 border-gray-200 border-b-2 relative'
        style={{ minHeight: '90px' }}
      >
        {data && data.cart.items == 0 && (
          <div
            className='flex justify-center items-center absolute'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <p>Your Cart Is Empty!</p>
          </div>
        )}
        {data &&
          data.cart.items_counter.map((item, index) => <Counter key={index} {...item}/>)}
      </div>
      <div className='py-2 px-6'>
        Total: {data && data.currency === 'USD' ? '$' : '€'}{' '}
        {data && data.cart.total.toFixed(2)}{' '}
      </div>
      <CurrencyButtons currency={data && data.currency} />
    </>
  )
}
