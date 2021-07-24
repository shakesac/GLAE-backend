import api from '@/api/api'
import { handleResponses } from '@/err.service'
import Swal from 'sweetalert2'

const state = {
    allItems: [],
}

const mutations = {
    setAllItems: (state, payload) => {
        state.allItems = payload
    },
}

const actions = {
    fetchAllItems: async ({commit}) => {
        try {
            const res = await api.get('/item/all')
            if (res.status == 200) {
                console.log(res.data)
                commit('setAllItems', res.data.data)
            }
        } catch (err) {
            throw Error(handleResponses(res))
        }
    }
}

const getters = {
    getAllItems(state) {
        return state.AllItems
    }
}

export default {
    state,
    mutations,
    actions,
    getters,    
}