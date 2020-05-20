<template>
  <div id="login text-center">
    <form action="#" @submit.prevent="loginSubmit" class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input type="text" id="inputUsernamel" class="form-control" placeholder="Username" required="" autofocus="" v-model="username">
      <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  }
</style>
