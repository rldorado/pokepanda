import { defineStore } from 'pinia'
import Pokemon from '@/models/Pokemon'
import { fetchAllPokemons } from '@/services'
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
    async loadAllPokemons(filter: string) {
      this.loading = true
      try {
        this.pokemons = await fetchAllPokemons(filter)
        this.error = null
      } catch (error) {
        this.error = 'Failed to load Pokemons'
      } finally {
        this.loading = false
      }
    }
  }
})
