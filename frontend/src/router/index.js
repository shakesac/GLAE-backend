import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: 'painel',
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
    name: 'painel',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiredAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/registo', '/about'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('STORAGE_USER_PROFILE');
  // redirecciona para página the login caso nao esteja logado
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
})


export default router
