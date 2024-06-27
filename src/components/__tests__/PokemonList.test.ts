import { describe, it, expect } from 'vitest'
import PokemonList from '@/components/PokemonList.vue'
import { shallowMount } from '@vue/test-utils'
import Pokemon from '@/models/Pokemon'

describe('PokemonList', () => {
  const pokemons: Pokemon[] = [
    { id: 1, name: 'bulbasaur', types: [{ name: 'poison' }, { name: 'grass' }] },
    { id: 2, name: 'ivysaur', types: [{ name: 'poison' }, { name: 'grass' }] },
    { id: 3, name: 'venusaur', types: [{ name: 'poison' }, { name: 'grass' }] }
  ]

  it('should render correctly', () => {
    const wrapper = shallowMount(PokemonList, {
      props: {
        pokemons,
        totalItems: pokemons.length,
        limit: 20,
        offset: 0,
        sort: {
          key: 'id',
          field: 'id',
          order: 1,
          options: [{ label: 'Pokedex', value: 'id' }]
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
