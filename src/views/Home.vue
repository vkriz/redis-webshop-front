<template>
  <div class="home">
    <Navbar/>
    <div class="container">
      <div class="card border-info mb-3">
        <div class="card-body text-info cursor-pointer" @click="goToBestSellers">
          <p class="card-text lead">Take a look at our best selling items.<i class="fa fa-arrow-right float-right"></i></p>
        </div>
      </div>

      <div class="card border-info mb-3">
        <div class="card-body text-info">
          <p class="card-text lead">Buy two of the same product and get 10% off. Buy three or more of the same
            product and get 20% off.
          </p>
        </div>
      </div>
    </div>
    
    <Products :productList="productList"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Products from '@/components/Products.vue'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
import router from '../router/index.js'

export default {
  name: 'Home',
  components: {
    Products,
    Navbar
  },

  data: function() {
    return {
      productList: []   
    }
  },

  methods: {
    goToBestSellers: function() {
      router.push('/bestsellers')
    }
  },

  beforeMount() {
    axios.get(this.$store.state.apiUrl + '/product/all')
      .then(res => { 
        this.productList = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
