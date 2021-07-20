import api from '@/api/api'
import { authService } from "@/api/auth.service.js";
import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_INFO,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_SUCCESS,
    AUTH_REGISTER_SUCCESS,
    SET_MESSAGE
  } from "./auth.constants";
import { STORAGE_ACCESS_TOKEN, STORAGE_USER_PROFILE } from "../constants";

const state = {
    //Inicializadas com os dados no storage caso existam.
    token: localStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    sessionStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    null,
    profile: JSON.parse(
        localStorage.getItem(STORAGE_ACCESS_TOKEN) ||
        sessionStorage.getItem(STORAGE_ACCESS_TOKEN) ||
        null,
    ),
    isAdmin: false,
    userInfo: {
        id: 0,
        firstName: null,
        lastName: null,
        email: null,
        subsectionId: 0,
    }
}

const mutations = {
    [AUTH_LOGIN_SUCCESS]: (state, data) => {
        state.token = data.token
        localStorage.STORAGE_ACCESS_TOKEN = data.token
        state.profile
        localStorage.STORAGE_USER_PROFILE = data.user
        data.role == 1 ? true : false
    },
    [AUTH_LOGOUT_SUCCESS]: state => {
        state.token = "";
        state.profile = {};
        localStorage.removeItem(STORAGE_ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_USER_PROFILE);
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
    },
    setUserInfo: (state, user) => {
        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            subsectionId: user.subsectionId
        }
        state.userInfo = userInfo
    }
}

const getters = {
    isLoggedIn: (state) => {
       return !!state.token
    },
    getProfile: (state) => {
        state.profile
    },
    getUserType: (state) => state.profile.type,
    getMessage: state => state.message,
    isAdmin: (state) => {
        return state.isAdmin
    },
    getUserInfo: (state) => {
        return state.userInfo
    }
}

const actions = {
    [AUTH_LOGIN]: async ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
          authService
          .login(payload)
          .then(res => {
              commit(AUTH_LOGIN_SUCCESS, {token: res.token, profile: res.profile, role: res.profile.roleId});
              commit(SET_MESSAGE, `Bem-vindo, ${res.profile.name}!`);
              resolve(res);
          })
          .catch(err => reject(err))
          
        })
    },
    logout: ({ commit }) => {
        localStorage.removeItem('user');
        commit('setToken', false)
        commit('setRole', false)
    },

    userInfo: async ({commit}) => {
        const res = await api.get('/user/me')
        console.log('userInfo: ', res)
        if (res.data.status == 'success') {
            commit('setUserInfo', res.data.data)
        }
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