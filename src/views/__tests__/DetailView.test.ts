import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import DetailView from '../DetailView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

vi.mock('vue-router', async (importOriginal) => {
  const original: typeof importOriginal = await importOriginal()
  return {
    ...original,
    useRoute: vi.fn().mockReturnValue({ params: { id: 1 } })
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('DetailView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render correctly', () => {
    const wrapper = shallowMount(DetailView, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
