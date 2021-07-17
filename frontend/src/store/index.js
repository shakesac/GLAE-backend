import { createStore } from 'vuex'
import api from '@/services/api.js'
import auth from './modules/auth'

export default createStore({
  state: {
    sections: []
  },
  mutations: {
    getSections(state, sections) {
      state.sections = sections
    },
    setUserData(state, users) {
      state.users = users
    }
  },
  actions: {
    getSections({ commit }) {
      api.get('/section/all').then(res => {
        commit('getSections', res.data.data)
        console.log('Action: ',res.data.data)
      })
    },
    registerUserAction({ commit }) {
      api.post('/register').then(res => {
        console.log('Cheguei à action')
        commit('setUserData', res.data.data)
      })
    },
  },
  getters: {
    getSections(state) {
      return state.sections
    }
  },
  modules: {
    auth,
  }
})
