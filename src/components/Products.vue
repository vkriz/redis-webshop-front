<template>
  <div id="products">
    <div class="container">
      <div v-for="(productGroup, index1) in groupedProducts" :key="index1" class="row mb-4">
        <Product v-for="(product, index2) in productGroup" :key="index2" class="col-lg-3" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'Products',
  props: {
    msg: String
  },
  components: {
    Product
  },
  computed:{
    groupedProducts() {
      return _.chunk(this.productList, 4)
      // returns a nested array: 
      // [[article, article, article], [article, article, article], ...]
    }
  },

  beforeMount() {
    axios.get(this.$store.state.apiUrl + '/product/all')
      .then(res => { this.productList = res.data })
      .catch(err => {
        console.log(err)
      })
  },

  data: function() {
    return {
      productList: []      
    }
  }
}
</script>

<style scoped>

</style>
