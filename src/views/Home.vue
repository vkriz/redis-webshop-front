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
    

      <div class="dropdown mb-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort by
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item cursor-pointer" @click="sort('price', true)">Price ascending</a>
          <a class="dropdown-item cursor-pointer" @click="sort('price', false)">Price descending</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item cursor-pointer" @click="sort('name', true)">Name ascending</a>
          <a class="dropdown-item cursor-pointer" @click="sort('name', false)">Name descending</a>
        </div>
      </div>

    </div>

    <Products :productList="productList" :loaded="loaded"/>
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
      productList: [],
      loaded: false
    }
  },

  methods: {
    sort: function(sortBy, ascending) {
      axios.get(this.$store.state.apiUrl + '/product/sort?sortBy=' + sortBy + '&asc=' + ascending)
      .then(res => { 
        this.productList = res.data
        this.waitForImages()
      })
      .catch(err => {
        console.log(err)
      })
    },

    goToBestSellers: function() {
      router.push('/bestsellers')
    },

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

  computed: {
    imagesToPreload() {
      var op = this.productList.map(function(item) {
        return item.image
      })
      return op
    }
  },

  beforeCreate() {
    axios.get(this.$store.state.apiUrl + '/product/all')
      .then(res => { 
        this.productList = res.data
        this.waitForImages()
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
