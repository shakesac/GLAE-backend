import api from '@/services/api'
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
        const res = await api.post('/login', payload).catch(err => {
                console.log(err)
            })
            if(res.data && res.data.status == 'success') {
                localStorage.setItem('user', JSON.stringify(res.data.data))
                commit('setToken', true)
                if (res.data.data.roleId == 1) {
                    commit('setRole', true)
                }
            }
    },
    /*
    login: async ({commit}, payload) => {
        const res = await api.post('/login', payload).catch(err => {
                console.log(err)
            })
            if(res.data.status == 'success') {
                commit('setToken', true)
                if (res.data.roleId == 1) {
                    commit('setRole', true)
                }
            }
    },
    */

    logout: async ({ commit }) => {
        await api.post('/logout')
        commit('setToken', null)
    },

    userInfo: async ({commit}) => {
        const res = await api.get('/user/me')
        if (res.data.status == 'success') {
            commit('setUserInfo', res.data)
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