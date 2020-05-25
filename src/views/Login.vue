<template>
  <div id="login text-center" class="pt-5">
    <form action="#" @submit.prevent="loginSubmit" class="form-signin text-center">
      <img class="mb-4 mt-4 cursor-pointer" src="../assets/logo.png" alt="" width="120" height="120" @click="goToHomePage">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input type="text" id="inputUsernamel" class="form-control" placeholder="Username" required="" autofocus="" v-model="username">
      <button class="btn btn-lg btn-info btn-block mt-4" type="submit">Sign in</button>

      <div v-if="loginError != null" class="card border-danger mt-3" style="max-width: 18rem;">
        <div class="card-body text-danger">
          <p class="card-text">Invalid username. Please try again. </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router/index.js'

export default {
  name: 'Login',

  data: function() {
    return {
      username: null
    }
  },

  computed: {
    ...mapState([
      'loggingIn',
      'loginError',
      'loginSuccessful'
    ])
  },

  methods: {
    ...mapActions([
      'doLogin'
    ]),
    loginSubmit () {
      this.doLogin(this.username)
    },
    goToHomePage() {
      router.push('/')
    }
  }
}
</script>

<style scoped>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 .2rem .4rem rgba(0,0,0,.4);
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>
