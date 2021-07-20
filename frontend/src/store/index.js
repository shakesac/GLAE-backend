import { createStore } from 'vuex'
//import api from '@/api/api'
import auth from './modules/auth.module'
import sections from './modules/sections.module'
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

  },
  //plugins: [createPersistedState()]
})
