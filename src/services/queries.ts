import { gql } from '@apollo/client/core'

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int, $name: String) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: { name: { _ilike: $name } }) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`
