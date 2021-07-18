import api from '@/services/api'
const state = {
    token: null
}

const getters = {
    isLoggedIn: (state) => {
       return !!state.token
    }
}

const actions = {
    login: ({ commit }, credentials) => {
        api.post('/login', credentials).then(res => {
            const token = res.data.token;
            document.cookie = 'jwt=' + token;
            commit('setToken', true)
        }).catch(err => {
            console.log('API resquest: ', err)
        })
    },
    logout: async ({ commit }) => {
        await api.post('/logout')
        commit('setToken', null)
    },
    registerUser({ commit }, user) {
        event.preventDefault();
        api.post('/register', user).then(res => {
          commit('setUserData', res.data.data)
        })
      }
}

const mutations = {
    setToken: (state, token) => {
        state.token = token
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}