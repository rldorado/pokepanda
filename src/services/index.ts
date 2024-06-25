import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GET_POKEMONS } from './queries'

const API_URL = 'https://beta.pokeapi.co/graphql/v1beta'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

export const fetchAllPokemons = async (filter: string = '') => {
  try {
    const { data } = await client.query({
      query: GET_POKEMONS,
      variables: {
        name: `%${filter}%`
      }
    })
    return data?.pokemon_v2_pokemon ?? []
  } catch (error) {
    throw new Error('Failed to fetch pokemons')
  }
}
