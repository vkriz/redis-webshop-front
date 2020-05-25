<template>
  <div class="bestsellers">
    <Navbar/>
    <div class="container">
      <h2 class="mb-4">Best selling items</h2>
    </div>
    
    <Products :productList="productList"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Products from '@/components/Products.vue'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
  name: 'BestSellers',
  components: {
    Products,
    Navbar
  },

  data: function() {
    return {
      productList: []   
    }
  },

  beforeMount() {
    axios.get(this.$store.state.apiUrl + '/cart/bestseller')
      .then(res => { 
        this.productList = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
