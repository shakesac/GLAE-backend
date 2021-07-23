import api from '@/api/api'
import leaseService from '@/api/lease.service'
import { handleResponses } from '@/err.service'
import Swal from 'sweetalert2'

const state = {
    allLeases: [],
    pendingLeases: [],
    userLeases: [],
    currentLease: [],
    deleted: 0
}

const mutations = {
    setAllLeases: (state, leases) => {
        state.allLeases = leases
    },
    setPendingLeases: (state, leases) => {
        state.pendingLeases = leases
    },
    setUserLeases: (state, leases) => {
        state.userLeases = leases
    },
    setCurrentLease: (state, leases) => {
        state.userLeases = leases
    },
    removeFromPending: (state, lease) => {
        state.pendingLeases.findIndex(lease).then(index => {
            state.pendingLeases.splice(index)
        })
    },
    delete: (state, deleted) => {
        state.deleted = deleted
    },
}

const actions = {
    fetchPendingLeases: async ({ commit }) => {
        try {
            const res = await api.get('/lease/all/pending')
            if (res.status == 200) {
                commit('setPendingLeases', res.data.data)
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    },
    fetchLeasesFromUser: async ({commit}) => {
        try {
            const res = await api.get('/lease/all/user')
            if (res.status == 200) {
                commit('setUserLeases', res.data.data)
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    },
    updateLeaseStatus: async ({ commit }, id, index, status) => {
        try {
            const res = await api.post('/lease/status/update/'+id, status)
            if (res.status == 200) {
                commit('removeFromPending', index)
                Swal.fire({
                    icon: 'sucesso',
                    title: 'O estado do emprestimo foi alterado.',
                    text: status,
                    timer: 1500,
                })
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    },
    cancelLease: ({commit}, payload) => {
        commit('deleted', payload)
    }
}

const getters = {
    getAllLeases(state) {
        return state.allLeases
    },
    getUserLeases(state) {
        return state.state.userLeases
    },
    getPendingLeases(state) {
        return state.pendingLeases
    },
    getCurrentLeases(state) {
        return state.currentLease
    }
}

export default {
    state,
    mutations,
    actions,
    getters,    
}