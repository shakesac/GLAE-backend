import api from '@/services/api'

const state = {
    allLeases: [],
    userLeases: [],
    currentLease: [],
}

const mutations = {
    setAllLeases: (state, leases) => {
        state.allLeases = leases
    },
    setUserLeases: (state, leases) => {
        state.userLeases = leases
    },
    setCurrentLease: (state, leases) => {
        state.userLeases = leases
    },
}

const actions = {
    fetchAllLeases({ commit }) {
        api.get('/leases/all').then(res => {
          commit('setAllLeases', res.data.data)
        })
    },
    fetchLeasesFromUser: ({commit}, sectionId) => {
        event.preventDefault();
        api.get('/leases/all/user').then(res => {
            commit('setUserLeases', res.data.data)
        })
    }
}

const getters = {
    getAllLeases(state) {
        return state.allLeases
    },
    getUserLeases(state) {
        return state.state.userLeases
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