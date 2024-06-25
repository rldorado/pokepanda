import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GET_POKEMONS } from './queries'

const API_URL = 'https://beta.pokeapi.co/graphql/v1beta'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

export const fetchPokemons = async (limit: number, offset: number, filter: string) => {
  try {
    return await client.query({
      query: GET_POKEMONS,
      variables: {
        limit,
        offset,
        name: `%${filter}%`
      }
    })
  } catch (error) {
    throw new Error('Failed to fetch pokemons')
  }
}
