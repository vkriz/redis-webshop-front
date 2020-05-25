<template>
  <div class="cart">
    <Navbar/>
    <div class="container">
      <table id="cart" class="table table-hover table-condensed">
        <thead>
          <tr>
            <th style="width:40%" class="text-center">Product</th>
            <th style="width:10%" class="text-center">Price</th>
            <th style="width:8%" class="text-center">Quantity</th>
            <th style="width:10%" class="text-center">Discount</th>
            <th style="width:22%" class="text-center">Subtotal</th>
            <th style="width:10%" class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <CartProduct v-for="(item, index) in cart" :key="index" :item="item" :index="index"/>
        </tbody>
        <tfoot>
          <tr>
            <td><a href="#" @click="goToHomePage" class="btn btn-outline-info"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
            <td colspan="3" class="hidden-xs"></td>
            <td class="hidden-xs text-center"><strong>Total ${{total.toFixed(2)}}</strong></td>
            <td class="pl-0 pr-0"><a href="" class="btn btn-info btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import CartProduct from '@/components/CartProduct.vue'
import router from '../router/index.js'
import { mapState } from 'vuex'

export default {
  name: 'Cart',

  components: {
    Navbar,
    CartProduct
  },

  data: function() {
    return {
      saving: false,
      saved: false
    }
  },

  computed: {
    total: function() {
      let sum = 0
      this.cart.forEach(element => {
        sum += (1 - element.discount) * element.quantity * element.product.unit_price;
      });
      return sum;
    },

    ...mapState([
      'username',
      'cart'
    ])
  },

  methods: {
    goToHomePage: function() {
      router.push('/')
    }
  }
}
</script>

<style scoped>
  .container {
    padding-top: 15px;
    background: #fff;
    box-shadow: 0 .2rem .4rem rgba(0,0,0,.4);
  }

  .table th {
    border-top: none;
  }
</style>