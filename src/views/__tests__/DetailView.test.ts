import { describe, expect, it, beforeEach, vi } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import DetailView from '../DetailView.vue'

const pokemon = { id: 1, name: 'Bulbasaur', types: [{ name: 'poison' }, { name: 'grass' }] }
vi.mock('@/stores/pokemonStore', () => ({
  default: vi.fn(() => ({
    pokemonDetail: pokemon,
    loadPokemonById: vi.fn(() => Promise.resolve(pokemon))
  }))
}))

describe('DetailView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render correctly', () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/pokemon/:id', component: DetailView }]
    })

    const wrapper = shallowMount(DetailView, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should load pokemon detail', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/pokemon/:id', component: DetailView }]
    })

    const wrapper = mount(DetailView, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toBe(pokemon.name)
  })
})
