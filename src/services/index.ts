import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GET_POKEMONS, GET_POKEMON_BY_ID } from './queries'
import Pokemon from '@/models/Pokemon'
import { CACHE_DURATION, CACHE_KEY_ALL_POKEMONS, CACHE_KEY_POKEMON_ID_PREFIX } from '@/constants'

const API_URL = 'https://beta.pokeapi.co/graphql/v1beta'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

/**
 * Determines if a given timestamp is expired based on the CACHE_DURATION constant.
 *
 * @param {number} timestamp - The timestamp to check.
 * @return {boolean} Returns true if the timestamp is expired, false otherwise.
 */
const isCacheExpired = (timestamp: number): boolean => {
  return Date.now() - timestamp > CACHE_DURATION
}

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
  // First check if data is cached
  const cachedData = localStorage.getItem(CACHE_KEY_ALL_POKEMONS)
  if (cachedData && !isCacheExpired(JSON.parse(cachedData).timestamp)) {
    if (filter) {
      return JSON.parse(cachedData).data.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase())
      )
    }
    return JSON.parse(cachedData).data
  }

  // No cached, fetch all pokemons
  try {
    const { data } = await client.query({
      query: GET_POKEMONS,
      variables: {
        name: `%${filter}%`
      }
    })
    const pokemons = data?.pokemon_v2_pokemon.map(createPokemonFromServer) || []

    // Cache data
    localStorage.setItem(
      CACHE_KEY_ALL_POKEMONS,
      JSON.stringify({ timestamp: Date.now(), data: pokemons })
    )
    return pokemons
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
  // First check if data is cached
  const cachedData = localStorage.getItem(`${CACHE_KEY_POKEMON_ID_PREFIX}${id}`)
  if (cachedData && !isCacheExpired(JSON.parse(cachedData).timestamp)) {
    return JSON.parse(cachedData).data
  }

  // No cached, fetch specific pokemon
  try {
    const { data } = await client.query({
      query: GET_POKEMON_BY_ID,
      variables: {
        id
      }
    })
    const pokemon = data ? createPokemonFromServer(data.pokemon_v2_pokemon_by_pk) : null

    // Cache data
    localStorage.setItem(
      `${CACHE_KEY_POKEMON_ID_PREFIX}${id}`,
      JSON.stringify({ timestamp: Date.now(), data: pokemon })
    )

    return pokemon
  } catch (error) {
    throw new Error('Failed to fetch pokemons')
  }
}

export const clearExpiredCache = () => {
  const keys = Object.keys(localStorage)
  keys.forEach((key) => {
    if (key.startsWith(CACHE_KEY_POKEMON_ID_PREFIX) || key === CACHE_KEY_ALL_POKEMONS) {
      const cachedData = localStorage.getItem(key)
      if (cachedData && isCacheExpired(JSON.parse(cachedData).timestamp)) {
        localStorage.removeItem(key)
      }
    }
  })
}
