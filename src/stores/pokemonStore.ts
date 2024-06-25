import { defineStore } from 'pinia'
import Pokemon from '@/models/Pokemon'
import { fetchPokemons } from '@/services'
interface PokemonState {
  pokemons: Pokemon[]
  loading: boolean
  error: string | null
}

export const usePokemonStore = defineStore('pokemonStore', {
  state: () =>
    ({
      pokemons: [],
      loading: false,
      error: null
    }) as PokemonState,
  actions: {
    async loadPokemons(limit: number, offset: number, filter: string) {
      this.loading = true
      try {
        const { data } = await fetchPokemons(limit, offset, filter)
        this.pokemons = data?.pokemon_v2_pokemon ?? []
        this.error = null
      } catch (error) {
        this.error = 'Failed to load Pokemons'
      } finally {
        this.loading = false
      }
    }
  }
})
