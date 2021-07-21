import api from '@/api/api'
import { authService } from "@/api/auth.service.js";
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
        return state.profile
    },
    getProfileName: (state) => {
        return state.profile.firstName.concat(' ', state.profile.lastName)
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
            Swal.fire({
                icon: 'error',
                title: err.status,
                text: err.response.data.message,
            })
            console.log()
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
      }
}

export default {
    state,
    getters,
    actions,
    mutations
}