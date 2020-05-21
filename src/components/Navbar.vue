<template>
  <nav class="navbar navbar-dark bg-dark mb-4">
    <div class="navbar-brand cursor-pointer" @click="goToHomePage">
      <img class="logo-img" src="../assets/logo_desno_cropped.png" alt="Logo">
    </div>
    <div class="" id="navbarColor01">
      <i class="fa fa-shopping-cart lead text-light cursor-pointer" @click="goToCart"></i>
      <span class='badge badge-primary' id='lblCartCount'>{{numProducts}}</span>
      
      <button v-if="this.username !== null" class="btn btn-outline-info my-2 my-sm-0 ml-4" @click="doLogout">Logout</button>
      <button v-else class="btn btn-outline-info my-2 my-sm-0 ml-4" @click="goToLogin">Login</button>
    </div>
  </nav>
</template>

<script>
import router from '../router/index.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Navbar',

  computed:{
    ...mapState([
      'numProducts',
      'username'
    ])
  },

  methods: {
    ...mapActions([
      'doLogout'
    ]),
    
    goToCart: function() {
      if(this.username !== null) 
        router.push('/cart')
      else router.push('/login')
    },

    goToLogin: function() {
      router.push('/login')
    },
    
    goToHomePage: function() {
      router.push('/')
    }
  }
}
</script>

<style scoped>
.logo-img {
  height: 50px;
}

.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
    font-size: 12px;
    background: #17a2b8;
    padding: 0 5px;
    vertical-align: top;
    margin-left: -10px; 
}

.cursor-pointer {
  cursor: pointer;
}
</style>
