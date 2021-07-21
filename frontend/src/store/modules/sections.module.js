import api from '@/api/api'
import {sectionService} from '@/api/section.service'
import { handleResponses } from '@/err.service'
import Swal from 'sweetalert2'

const state = {
    sections: [],
    subsections: [],
    subsectionsFromSection: [],
}

const mutations = {
    setSections: (state, sections) => {
        state.sections = sections
    },
    setSubsections: (state, subsections) => {
        state.subsections = subsections
    },
    setSubsectionsFromSection: (state, subsections) => {
        state.subsectionsFromSection = subsections
    }
}

const actions = {
    addSection: async ({ commit }, payload) => {
        try {
            const res = await sectionService.new()
        } catch(err) {
            handleResponses(err)
        }
        
    },
    fetchSections({ commit }) {
        api.get('/section/all').then(res => {
          commit('setSections', res.data.data)
        })
    },
    fetchSubsectionsFromSection: ({commit}, sectionId) => {
        event.preventDefault();
        api.get('/section/'+sectionId+'/sub').then(res => {
            commit('setSubsectionsFromSection', res.data.data)
        })
    }
}

const getters = {
    getSections(state) {
        return state.sections
    },
    getSubsectionsFromSection(state) {
        return state.subsectionsFromSection
    }
}

export default {
    state,
    mutations,
    actions,
    getters,    
}