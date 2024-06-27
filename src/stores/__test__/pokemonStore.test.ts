import { describe, it, expect, vi, beforeEach } from 'vitest'
import usePokemonStore from '../pokemonStore'
import { createPinia, setActivePinia } from 'pinia'
import { fetchAllPokemons } from '@/services'

vi.mock('@/services', async () => ({
  fetchAllPokemons: vi.fn(() =>
    Promise.resolve([
      { id: 1, name: 'bulbasaur', types: [{ name: 'poison' }, { name: 'grass' }] },
      { id: 2, name: 'ivysaur', types: [{ name: 'poison' }, { name: 'grass' }] },
      { id: 3, name: 'venusaur', types: [{ name: 'poison' }, { name: 'grass' }] }
    ])
  ),
  fetchPokemonById: vi.fn(() =>
    Promise.resolve({ id: 1, name: 'bulbasaur', types: [{ name: 'poison' }, { name: 'grass' }] })
  )
}))

describe('pokemonStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize the store with empty state', () => {
    const store = usePokemonStore()

    expect(store.pokemons).toEqual([])
    expect(store.loading).toEqual(false)
    expect(store.error).toEqual(null)
    expect(store.pokemonDetail).toEqual(null)
  })

  it('should load all pokemons', async () => {
    const store = usePokemonStore()
    await store.loadAllPokemons('')

    expect(store.pokemons).toEqual([
      { id: 1, name: 'bulbasaur', types: [{ name: 'poison' }, { name: 'grass' }] },
      { id: 2, name: 'ivysaur', types: [{ name: 'poison' }, { name: 'grass' }] },
      { id: 3, name: 'venusaur', types: [{ name: 'poison' }, { name: 'grass' }] }
    ])
  })

  it('handles error when loading all pokemons', async () => {
    vi.mocked(fetchAllPokemons).mockRejectedValue(new Error('Failed to load Pokemons'))

    const store = usePokemonStore()
    await store.loadAllPokemons('')

    expect(store.error).toEqual('Failed to load Pokemons')
  })

  it('should load pokemon by id', async () => {
    const store = usePokemonStore()
    await store.loadPokemonById(1)

    expect(store.pokemonDetail).toEqual({
      id: 1,
      name: 'bulbasaur',
      types: [{ name: 'poison' }, { name: 'grass' }]
    })
  })
})
