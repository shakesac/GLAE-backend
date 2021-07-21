import api from '@/api/api'
import { handleResponses } from '@/err.service'

const state = {
    users: [],
}

const mutations = {
    setAllUsers: (state, users) => {
        state.users = users
        console.log(users)
    },

}

const actions = {
    fetchAllUsers: async ({ commit }) => {
        try {
            const res = await api.get('/user/all')
            if (res.status == 200) {
                commit('setAllUsers', res.data.data)
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    },
}

const getters = {
    getAllUsers(state) {
        return state.users
    }
}

export default {
    state,
    mutations,
    actions,
    getters,    
}