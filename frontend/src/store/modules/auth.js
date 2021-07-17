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
        event.preventDefault();
        api.post('/login', credentials).then(res => {
            const token = res.data.token;
            document.cookie = "auth_token="+token;
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