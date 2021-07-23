import api from '@/api/api'
import { authService } from "@/api/auth.service.js";
import { handleResponses } from '@/err.service'
import Swal from 'sweetalert2'

const state = {
    //Inicializadas com os dados no storage caso existam.
    token: localStorage.getItem('STORAGE_ACCESS_TOKEN') ||
    sessionStorage.getItem('STORAGE_ACCESS_TOKEN') ||
    '',
    profile:
        JSON.parse(
        localStorage.getItem('STORAGE_USER_PROFILE') ||
        sessionStorage.getItem('STORAGE_USER_PROFILE') ||
        '{}',
    ),
    isAdmin: false,
}

const mutations = {
    loginSuccess: (state, data) => {
        state.token = data.token
        localStorage.STORAGE_ACCESS_TOKEN = data.token
        state.profile = data.profile
        localStorage.STORAGE_USER_PROFILE = JSON.stringify(data.profile)
        data.role == 1 ? true : false
    },
    logout: state => {
        state.token = ''
        state.profile = {}
        localStorage.removeItem('STORAGE_ACCESS_TOKEN')
        localStorage.removeItem('STORAGE_USER_PROFILE')
    },
    setToken: (state, token) => {
        state.token = token
    },
    setRole: (state, bool) => {
        state.isAdmin = bool
    }
}

const getters = {
    isLoggedIn: (state) => {
       return state.token !=''
    },
    getProfile: (state) => {
        console.log(state.profile)
        return state.profile
    },
    getProfileName: (state) => {
        return state.profile.firstName.concat(' ', state.profile.lastName)
    },
    getProfileDate: (state) => {
        const dateArray = state.profile.createdAt.split('T')
        return dateArray[0]
    },
    isAdmin: (state) => {
        console.log(state.isAdmin)
        return state.isAdmin
    },
}

const actions = {
    login: async ({ commit }, payload) => {
        try {
            const res = await authService.login(payload)
            commit('loginSuccess', {
                token: res.token,
                profile: res.profile,
                role: res.profile.roleId
            })
        } catch (err) {
            handleResponses(err)
        }
    },
    logout: ({ commit }) => {
        localStorage.removeItem('user');
        commit('setToken', false)
        commit('setRole', false)
    },
    registerUser({ commit }, user) {
        event.preventDefault();
        api.post('/register', user).then(res => {
          commit('setUserData', res.data.data)
        })
    },
    delCurrentUser: async () => {
        try {
            await authService.deleteUser();
            this.logout()
            Swal.fire({
                icon: 'sucesso',
                title: 'Conta eliminada com sucesso.',
            })
        } catch (err) {
            handleResponses(err)
        }

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}