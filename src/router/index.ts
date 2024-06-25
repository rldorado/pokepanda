import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/pokemon/:id',
    component: () => import('@/views/DetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
