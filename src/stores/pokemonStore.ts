import { defineStore } from 'pinia'
import Pokemon from '@/models/Pokemon'
import { fetchAllPokemons, fetchPokemonById } from '@/services'

interface PokemonState {
  pokemons: Pokemon[]
  pokemonDetail: Pokemon | null
  loading: boolean
  error: string | null
}

const usePokemonStore = defineStore('pokemonStore', {
  state: () =>
    ({
      pokemons: [] as Pokemon[],
      pokemonDetail: null,
      loading: false,
      error: null
    }) as PokemonState,
  actions: {
    async loadAllPokemons(filter: string = '') {
      this.loading = true
      try {
        this.pokemons = (await fetchAllPokemons(filter)) ?? []
        this.error = null
      } catch (error) {
        this.error = 'Failed to load Pokemons'
      } finally {
        this.loading = false
      }
    },
    async loadPokemonById(id: number) {
      this.loading = true
      try {
        this.pokemonDetail = await fetchPokemonById(id)
        this.error = null
      } catch (error) {
        this.error = 'Failed to load Pokemons'
      } finally {
        this.loading = false
      }
    }
  }
})

export default usePokemonStore
