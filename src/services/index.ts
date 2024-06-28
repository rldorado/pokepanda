import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GET_POKEMONS, GET_POKEMON_BY_ID } from './queries'
import Pokemon from '@/models/Pokemon'

const API_URL = 'https://beta.pokeapi.co/graphql/v1beta'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

/**
 * Creates a Pokemon object from the given server data.
 *
 * @param {any} pokemon - The server data containing the Pokemon information.
 * @return {Pokemon} The created Pokemon object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createPokemonFromServer = (pokemon: any): Pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    base_experience: pokemon.base_experience,
    types: pokemon.pokemon_v2_pokemontypes?.map((type: { pokemon_v2_type: { name: string } }) => ({
      name: type.pokemon_v2_type.name
    })),
    abilities: pokemon.pokemon_v2_pokemonabilities?.map(
      (ability: { pokemon_v2_ability: { name: string } }) => ({
        name: ability.pokemon_v2_ability.name
      })
    ),
    stats: pokemon.pokemon_v2_pokemonstats?.map(
      (stat: { base_stat: number; pokemon_v2_stat: { name: string } }) => ({
        name: stat.pokemon_v2_stat.name,
        base_stat: stat.base_stat
      })
    )
  }
}

/**
 * Fetches all Pokemons from the API based on the provided filter.
 *
 * @param {string} filter - The filter to apply to the Pokemon names. Defaults to an empty string.
 * @return {Promise<Pokemon[]>} A promise that resolves to an array of Pokemon objects.
 * @throws {Error} If the API call fails.
 */
export const fetchAllPokemons = async (filter: string = ''): Promise<Pokemon[]> => {
  try {
    const { data } = await client.query({
      query: GET_POKEMONS,
      variables: {
        name: `%${filter}%`
      }
    })
    return data?.pokemon_v2_pokemon.map(createPokemonFromServer) || []
  } catch (error) {
    throw new Error('Failed to fetch pokemons')
  }
}

/**
 * Fetches a specific Pokemon by its ID.
 *
 * @param {number} id - The ID of the Pokemon to fetch.
 * @return {Promise<Pokemon | null>} A promise that resolves to the fetched Pokemon or null if not found.
 */
export const fetchPokemonById = async (id: number): Promise<Pokemon | null> => {
  try {
    const { data } = await client.query({
      query: GET_POKEMON_BY_ID,
      variables: {
        id
      }
    })
    return data ? createPokemonFromServer(data.pokemon_v2_pokemon_by_pk) : null
  } catch (error) {
    throw new Error('Failed to fetch pokemons')
  }
}
