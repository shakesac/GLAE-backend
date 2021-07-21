import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Perfil from '../views/Profile.vue'

const routes = [
  /*
  {
    path: '/',
    redirect: '/perfil',
  },
  */
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
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiredAuth: true }
  },
  {
    path: '/admin',
    name: 'Administração',
    component: () => import('@/views/AdminManag.vue'),
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
    console.log('Utilizador autenticado.')
    next();
  }
})


export default router
