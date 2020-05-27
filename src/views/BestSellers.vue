<template>
  <div class="bestsellers">
    <Navbar/>
    <div class="container">
      <h2 class="mb-4">Best selling items</h2>
    </div>
    
    <Products :productList="productList" :loaded="loaded"/>
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
      productList: [],
      loaded: false
    }
  },

  methods: {
    waitForImages: function () {
      let imageLoaded = 0;
      for (const imageSrc of this.imagesToPreload) { 
        const img = new Image();
        img.src = imageSrc;

        let that = this
        img.onload = () => {
          imageLoaded++;

          if (imageLoaded > 0.7 * that.imagesToPreload.length) {
            that.loaded = true;
            return
          }
        };
      }
      this.loaded = true
    }
  },

  beforeMount() {
    axios.get(this.$store.state.apiUrl + '/cart/bestseller')
      .then(res => { 
        this.productList = res.data
        this.waitForImages()
      })
      .catch(err => {
        console.log(err)
      })
  },

  computed: {
    imagesToPreload() {
      var op = this.productList.map(function(item) {
        return item.image
      })
      return op
    }
  }
}
</script>
