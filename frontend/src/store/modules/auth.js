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
        console.log('NUNO')
        console.log(credentials)
        api.post('/login', credentials).then(res => {
            commit('setToken', res.data.token)
        }).catch(err => {
            console.log('API resquest: ', err)
        })
    },
    logout: async ({ commit }) => {
        await api.post('/logout')
        commit('setToken', null)
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