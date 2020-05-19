import React from 'react'
import { useMutation, gql } from '@apollo/client'

export const MUTATION_CONVERT_CURRENCY = gql`
  mutation($newCurrency: String!) {
    convertCurrency(newCurrency: $newCurrency) @client
  }
`

export function CurrencyButtons (props) {
  const [convertCurrency] = useMutation(MUTATION_CONVERT_CURRENCY)

  return (
    <>
    <div className="flex">
      <button
      className={'px-6 py-2 hover:bg-green-200 ' + (props.currency === 'USD' ? 'bg-green-200' : '')}
        value={props.currency === 'USD'}
        onClick={() => convertCurrency({ variables: { newCurrency: 'USD' } })}
      >USD</button>
      <button
      className={'px-6 py-2 hover:bg-green-200 ml-2 ' + (props.currency === 'EUR' ? 'bg-green-200' : '')}
        value={props.currency === 'EUR'}
        onClick={() => convertCurrency({ variables: { newCurrency: 'EUR' } })}
      >EUR</button>
      </div>
    </>
  )
}
