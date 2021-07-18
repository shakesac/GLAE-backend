import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiredAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue'),
    meta: { requiredAuth: false }
  },
  {
    path: '/login',
    name: 'Iniciar sessão',
    component: Login,
    meta: { requiredAuth: false }
  },
  {
    path: '/registo',
    name: 'Registo',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/teste',
    name: 'Teste',
    component: () => import('@/views/Testes.vue'),
  },
  {
    path: '/painel',
    name: 'Painel',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiredAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiredAuth) {
    let userInfo = store.getters['auth/getUserInfo']
    if (userInfo.id === 0) {
      await store.dispatch('userInfo')
      userInfo = store.getters['auth/getUserInfo']
      if (userInfo.id === 0) {
        return next({
          path: '/login'
        })
      } else {
        return next()
      }
    }
  }
  return next()
})

export default router
