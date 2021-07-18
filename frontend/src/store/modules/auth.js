import api from '@/services/api'
import axios from 'axios'
const state = {
    token: null,
    isAdmin: false,
}

const getters = {
    isLoggedIn: (state) => {
       return !!state.token
    }
}

const actions = {
    login: async ({commit}, payload) => {
        const res = await axios.post(
            'http://localhost:5000/api/v1/login',
            payload,
            {
                credentials: 'include'
            }).catch(err => {
                console.log(err)
            })
            if(res.data.status == 'success') {
                const token = res.data.token;
                document.cookie = 'jwt=' + token;
                commit('setToken', true)
                if (res.data.roleId == 1) {
                    commit('setRole', true)
                }
            }
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
    },
    setRole: (state, bool) => {
        state.isAdmin = bool
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}