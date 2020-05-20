import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:8080',

    loggingIn: false,
    loginError: null
  },
  mutations: {
    loginStart: (state) => { state.loggingIn = true },
    loginStop: (state, errorMessage) => {
      state.loggingIn = false
      state.loginError = errorMessage
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    logout: (state) => {
      state.accessToken = null
    }
  },
  actions: {
    doLogin ({ commit, state }, username) {
      commit('loginStart')

      axios.get(state.apiUrl + '/cart/get/' + username)
        .then(response => {
          commit('loginStop', null)
          localStorage.setItem("username", username)
          localStorage.setItem("numProducts", response.data.details.length)
          localStorage.setItem("cart", response.data.details)
         
          router.push('/')
        })
        .catch(error => {
          commit('loginStop', error.response.data.message)
        })
    },

    doLogout ({ commit }) {
      localStorage.removeItem('username')
      localStorage.removeItem('numProducts')
      localStorage.removeItem('cart')
      commit('logout')
      router.push('/')
    }
  },
  modules: {
  }
})
