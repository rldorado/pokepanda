import { defineStore } from 'pinia'
import Pokemon from '@/models/Pokemon'
import { fetchAllPokemons, fetchPokemonById } from '@/services'
import { Ref, ref } from 'vue'
interface PokemonState {
  pokemons: Ref<Pokemon[]>
  pokemonDetail: Ref<Pokemon | null>
  loading: boolean
  error: string | null
}

export const usePokemonStore = defineStore('pokemonStore', {
  state: () =>
    ({
      pokemons: ref<Pokemon[]>([]),
      pokemonDetail: ref(null),
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
