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
    cart: []
  },

  mutations: {
    loginStart: (state) => { state.loggingIn = true },
    loginStop: (state, errorMessage) => {
      state.loggingIn = false
      state.loginError = errorMessage
    },
    
    logout: (state) => {
      state.username = null,
      state.cart = []
    },
  
    username: (state, username) => {
      state.username = username
    },

    cart: (state, cart) => {
      state.cart = cart
    },

    updateProduct: (state, payload) => {
      state.cart[payload.index] = payload.item
    },

    removeProduct: (state, index) => {
      state.cart.splice(index, 1)
    },

    addProduct: (state, item) => {
      state.cart.push(item)
    }
  },

  actions: {
    doLogin ({ commit, state }, username) {
      commit('loginStart')

      axios.get(state.apiUrl + '/login/' + username)
        .then(() => {
          axios.get(state.apiUrl + '/cart/get/' + username)
            .then(response => {
              commit('loginStop', null)
            
              commit('username', username)
              commit('cart', response.data.details)
            
              router.push('/')
            })
            .catch(error => {
              commit('loginStop', error.response)
            })
        })
        .catch(error => {
          commit('loginStop', error.response)
        })
      
    },

    doLogout ({ commit, state }) {
      commit('logout')
      axios.get(state.apiUrl + '/logout/' + state.username)
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          if(router.currentRoute.fullPath === '/') {
            router.go(router.currentRoute)
          } else {
            router.push('/')
          }
        })
    },

    updateCartProduct( { commit }, payload) {
      console.log(payload.index)
      console.log(payload.item)
      commit('updateProduct', payload)
    },

    removeCartProduct( { commit }, index) {
      commit('removeProduct', index)
    },

    addCartProduct( { commit }, item) {
      console.log(item)
      commit('addProduct', item)
    }
  }
})
