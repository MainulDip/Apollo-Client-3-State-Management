import React from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'

const MUTATION_ADD_ITEM_TO_CART = gql`
  mutation($id: String!) {
    addItemToCart(id: $id) @client
  }
`

const QUERY_CURRENT_CURRENCY = gql`
  query {
    currency @client
  }
`

// render an item with some styling
export function Item (props) {
  const [addItemToCart] = useMutation(MUTATION_ADD_ITEM_TO_CART, {
    variables: { id: props.id }
  })
  const { data } = useQuery(QUERY_CURRENT_CURRENCY)

  return (
    <>
      <img
        src={props.thumbnail_url}
        style={{ height: 125, objectFit: 'cover' }}
      />

      <div className='block pt-4 pb-2'>
        <h2 className='pr-1 inline'>{props.title}</h2>
        <span className=''>
          {data.currency === 'EUR' ? '€' : '$'}
          {props.price.toFixed(2)}
        </span>
      </div>

      <button className='block p-2 hover:bg-gray-400 bg-gray-200 align-middle text-center' onClick={addItemToCart}>Add to Cart</button>
    </>
  )
}
