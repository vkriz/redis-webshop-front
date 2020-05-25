<template>
  <div class="bestsellers">
    <Navbar/>
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
    axios.get(this.$store.state.apiUrl + '/product/sort')
      .then(res => { 
        this.productList = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
