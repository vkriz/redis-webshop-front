<template>
  <div class="home">
    <Products msg="Blabla"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Products from '@/components/Products.vue'

export default {
  name: 'Home',
  components: {
    Products
  }
}
</script>
