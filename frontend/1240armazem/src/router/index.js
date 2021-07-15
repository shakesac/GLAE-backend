import Vue from 'Vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: history,
    routes
})

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about,',
        // Carregamento lazy (loaded apenas quando é visitada)
        component: () => import('../views/About.vue')
    },
    {
        path: '*',
        component: PageNotFound
    }
]

export default router