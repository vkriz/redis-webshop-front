import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({})
  ],

  state: {
    apiUrl: 'http://localhost:8080',

    loggingIn: false,
    loginError: null,

    username: null,
    numProducts: 0,
    cart: []
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
      state.username = null,
      state.numProducts = 0,
      state.cart = []
    },
  
    username: (state, username) => {
      state.username = username
    },
    numProducts: (state, numProducts) => {
      state.numProducts = numProducts
    },
    cart: (state, cart) => {
      state.cart = cart
    }
  },

  actions: {
    doLogin ({ commit, state }, username) {
      commit('loginStart')

      axios.get(state.apiUrl + '/cart/get/' + username)
        .then(response => {
          commit('loginStop', null)
        
          commit('username', username)
          commit('numProducts', response.data.details.length)
          commit('cart', response.data.details)
         
          router.push('/')
        })
        .catch(error => {
          commit('loginStop', error.response.data.message)
        })
    },

    doLogout ({ commit }) {
      commit('logout')
      if(router.currentRoute.fullPath === '/') {
        router.go(router.currentRoute)
      } else {
        router.push('/')
      }
    },

    setNumProducts( { commit }, numProducts) {
      commit('numProducts', numProducts)
    },

    setCart( { commit }, cart) {
      commit('cart', cart)
    }
  }
})
