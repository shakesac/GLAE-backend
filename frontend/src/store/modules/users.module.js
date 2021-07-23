import api from '@/api/api'
import { handleResponses } from '@/err.service'
import Swal from 'sweetalert2'

const state = {
    users: [],
}

const mutations = {
    setAllUsers: (state, users) => {
        state.users = users
    },
    deleteUser: (state, payload) => {
        const i = state.users.map(item => item.id).indexOf(payload);
        state.users.splice(i, 1);
    }
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
    deleteUser: async ({ commit }, payload) => {
        try {
            const res = await api.delete('/user/'+payload)
            if (res.status == 200) {
                commit('deleteUser', payload)
                Swal.fire({
                    icon: 'success',
                    title: 'Utilizador removido com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    }
}

const getters = {
    getAllUsers(state) {
        return state.users
    },
    getProfileCreationDate(state) {
        return state.profile.createdAt.split('T')[0]
    }
}

export default {
    state,
    mutations,
    actions,
    getters,    
}