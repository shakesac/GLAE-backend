import api from '@/services/api'

const state = {
    users: [],
}

const mutations = {
    setAllUsers: (state, users) => {
        state.users = users
    }
}

const actions = {
    fetchAllUsers({ commit }) {
        api.get('/users/all').then(res => {
          commit('setAllUsers', res.data.data)
        })
    }
}

const getters = {
    getAllUsers(state) {
        return state.allUsers
    }
}

export default {
    state,
    mutations,
    actions,
    getters,    
}