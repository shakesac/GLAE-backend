import api from '@/services/api'
import axios from 'axios'
const state = {
    token: null,
    isAdmin: false,
    userInfo: {
        id: 0,
        firstName: null,
        lastName: null,
        email: null,
        subsectionId: 0,
    }
}

const getters = {
    isLoggedIn: (state) => {
       return !!state.token
    },
    isAdmin: (state) => {
        return state.isAdmin
    },
    getUserInfo: (state) => {
        return state.userInfo
    }
}

const actions = {
    login: async ({commit}, payload) => {
        const res = await axios.post(
            'http://127.0.0.1:5000/api/v1/login',
            payload, {
                withCredentials: true,
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

    userInfo: async ({commit}) => {
        const get = await api.get('/user/me')
        if (res.data.status == 'success') {
            commit('setUserInfo', res.data.data)
        }
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
    },
    setUserInfo: (state, user) => {
        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            subsectionId: user.subsectionId
        }
        state.userInfo = userInfo
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}