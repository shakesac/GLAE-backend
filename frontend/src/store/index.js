import { createStore } from 'vuex'
//import api from '@/api/api'
import auth from '@/store/modules/auth.module'
import sections from '@/store/modules/sections.module'
import leases from '@/store/modules/lease.module'
//import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userRole: 'user'

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

  },
  //plugins: [createPersistedState()]
})
