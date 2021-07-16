import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Iniciar sessão',
    component: Login
  },
  {
    path: '/registo',
    name: 'Registo',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/teste',
    name: 'Teste',
    component: () => import('@/views/Testes.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
