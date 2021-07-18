import { createStore } from 'vuex'
//import api from '@/services/api.js'
import auth from './modules/auth'
import sections from './modules/sections'
import createPersistedState from "vuex-persistedstate";

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
  plugins: [createPersistedState()]
})
