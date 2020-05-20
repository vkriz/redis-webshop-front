<template>
  <div class="home">
    <Navbar/>
    <Products msg="Blabla"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Products from '@/components/Products.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Products,
    Navbar
  }
}
</script>
