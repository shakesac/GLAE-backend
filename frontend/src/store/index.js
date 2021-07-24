import { createStore } from 'vuex'
//import api from '@/api/api'
import auth from '@/store/modules/auth.module'
import sections from '@/store/modules/sections.module'
import leases from '@/store/modules/lease.module'
import users from '@/store/modules/users.module'
import items from '@/store/modules/items.module'

export default createStore({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
  modules: {
    auth,
    sections,
    leases,
    users,
    items,

  },
})
