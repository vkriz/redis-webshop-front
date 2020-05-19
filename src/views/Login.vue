<template>
  <div id="login">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data: function() {
    return {}
  }
}
</script>

<style scoped>

</style>
