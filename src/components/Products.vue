<template>
  <div id="products">
    <div v-if="!loaded" class="text-center">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-if="loaded" class="container">
      <div v-for="(productGroup, index1) in groupedProducts" :key="index1" class="row mb-4">
        <Product v-for="(product, index2) in productGroup" :key="index2" class="col-lg-3" :product="product" :index="4 * index1 + index2"/>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'
import _ from 'lodash'

export default {
  name: 'Products',

  props: {
    productList: Array,
    loaded: Boolean
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
  }
}
</script>

<style scoped>

</style>
