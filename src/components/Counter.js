import React from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'
import { MUTATION_ADD_ITEM_TO_CART } from './Item'

const REMOVE_ITEM_FROM_CART = gql`
  mutation($id: String!) {
    removeFromCart(id: $id) @client
  }
`

const Counter = ({ id, counter, title }) => {
  const [addItemToCart] = useMutation(MUTATION_ADD_ITEM_TO_CART, {
    variables: { id }
  })
  const [removeFromCart] = useMutation(REMOVE_ITEM_FROM_CART, {
    variables: { id }
  })

  console.log(id);
  return (
    <div>
      {title}
      <button className='ml-4 mr-2 bg-gray-200 rounded-full h-1 w-1 items-center' onClick={removeFromCart}>- </button>
      {counter}
      <button className='ml-1 bg-gray-200 rounded-full h-1 w-1 items-center' onClick={addItemToCart}> +</button>
    </div>
  )
}

export default Counter
