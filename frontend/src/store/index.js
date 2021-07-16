import { createStore } from 'vuex'
import api from '@/services/api.js'

export default createStore({
  state: {
    sections: []
  },
  mutations: {
    getSections(state, sections) {
      state.sections = sections
    }
  },
  actions: {
    getSections({ commit }) {
      api.get('/section/all').then(res => {
        commit('getSections', res.data.data)
        console.log('Action: ',res.data.data)
      })
    }
  },
  getters: {
    getSections(state) {
      return state.sections
    }
  },
  modules: {
  }
})
