import api from '@/api/api'
import { authService } from "@/api/auth.service.js";
import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_INFO,
    AUTH_REGISTER_SUCCESS,
    SET_MESSAGE
  } from "./auth.constants";

const state = {
    //Inicializadas com os dados no storage caso existam.
    token: localStorage.getItem('STORAGE_ACCESS_TOKEN') ||
    sessionStorage.getItem('STORAGE_ACCESS_TOKEN') ||
    '',
    profile: //JSON.parse(
        localStorage.getItem('STORAGE_ACCESS_TOKEN') ||
        sessionStorage.getItem('STORAGE_ACCESS_TOKEN') ||
        '{}',
    //),
    isAdmin: false,
}

const mutations = {
    loginSuccess: (state, data) => {
        state.token = data.token
        localStorage.STORAGE_ACCESS_TOKEN = data.token
        state.profile = data.profile
        localStorage.setItem('STORAGE_USER_PROFILE', JSON.stringify(data.profile))
        data.role == 1 ? true : false
    },
    logout: state => {
        state.token = ''
        state.profile = {}
        localStorage.removeItem('STORAGE_ACCESS_TOKEN')
        localStorage.removeItem('STORAGE_USER_PROFILE')
    },
    [AUTH_REGISTER_SUCCESS]: (state, data) => {
    state.register = data;
    },
    [SET_MESSAGE]: (state, message) => {
    state.message = message;
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
        state.profile
    },
    getProfileName: state => state.profile.name,
    getMessage: state => state.message,
    isAdmin: (state) => {
        console.log(state.isAdmin)
        return state.isAdmin
    },
}

const actions = {
    login: async ({ commit }, payload) => {
        try {
            const res = await authService.login(payload)
            alert('Bem-vindo ', res.profile.firstName )
            commit('loginSuccess', {
                token: res.token,
                profile: res.profile,
                role: res.profile.roleId
            })
            commit(SET_MESSAGE, `Bem-vindo, ${res.profile.firstName}!`)
        } catch (err) {
            console.log(err)
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