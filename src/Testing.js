import React, { useState, useEffect } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery
} from '@apollo/client'
import {available_items} from './api'
import { resolvers } from './resolvers'
import {Test} from './Test'

const cache = new InMemoryCache({})

const client = new ApolloClient({
  cache: cache,
  resolvers: resolvers
})

cache.writeQuery({
  query: gql`
  query {
    cart {
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
      items: [],
      total: 0,
      __typename: 'Cart'
    },
    currency: 'USD',
    itemsForSale: available_items
  }
})



export function Testing () {

  

  return (
    <ApolloProvider client={client}>
      <Test/>
    </ApolloProvider>
  )
}
