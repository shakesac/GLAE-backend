import api from '@/api/api'
import leaseService from '@/api/lease.service'
import { handleResponses } from '@/err.service'
import Swal from 'sweetalert2'

const state = {
    allLeases: [],
    pendingLeases: [],
    inProgressLeases: [],
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
    setInProgressLeases: (state, leases) => {
        state.pendingLeases = leases
    },
    setUserLeases: (state, leases) => {
        state.userLeases = leases
    },
    setCurrentLease: (state, leases) => {
        state.userLeases = leases
    },
    removeFromPending: (state, payload) => {
        const i = state.lease.map(item => item.id).indexOf(payload);
        state.lease.splice(i, 1);
    },
    removeFromInProgress: (state, payload) => {
        const i = state.lease.map(item => item.id).indexOf(payload);
        state.lease.splice(i, 1);
    },
    delete: (state, deleted) => {
        state.deleted = deleted
    },
}

const actions = {
    fetchStatusLeases: async ({ commit }, status) => {
        try {
            const res = await api.get('/lease/all/'+status)
            if (res.status == 200) {
                console.log(res.data)
                const capsState = status.charAt(0).toUpperCase() + status.slice(1)
                console.log(capsState)
                commit('set' + capsState + 'Leases', res.data.data)
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
            console.log(res.data.data)
            if (res.status == 200) {
                commit('setUserLeases', res.data.data)
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    },
    updateLeaseStatus: async ({ commit }, payload) => {
        const { id, status } = payload
        try {
            const res = await api.post('/lease/status/update/'+id, status)
            if (res.status == 200) {
                commit('removeFromPending', id)
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    },
    cancelLease: ({commit}, payload) => {
        commit('deleted', payload)
    },
    closeLease: async ({commit}, payload) => {
        const { id, status, comment } = payload
        try {
            const res = await api.post('/lease/status/update/'+id, status, comment)
            if (res.status == 200 && status == 'pending') {
                commit('removeFromPending', id)
            } else if (res.status == 200 && status == 'inProgress') {
                commit('removeFromInProgress', id)
            } else {
                throw Error(handleResponses(res))
            }
        } catch(err) {
            handleResponses(err)
        }
    }
}

const getters = {
    getAllLeases(state) {
        return state.allLeases
    },
    getUserLeases(state) {
        return state.userLeases
    },
    getPendingLeases(state) {
        return state.pendingLeases
    },
    getInProgressLeases(state) {
        return state.inP
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