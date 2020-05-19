import React from 'react'
import { gql, useQuery } from '@apollo/client'

const Data_Fetching = gql`
  query {
      itemsForSale @client {
        id
        title
        thumbnail_url
        price
      }
  }
`
export const Test = () => {
    const { data, client } = useQuery(Data_Fetching);
  console.log(data)
    return (
        <div>
            Hello
        </div>
    )
}
