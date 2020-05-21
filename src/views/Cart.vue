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
          <tr v-for="(item, index) in cart" :key="index">
            <td data-th="Product">
              <div class="row">
                <div class="col-sm-3 hidden-xs"><img :src="item.product.image" :alt="item.product.name" class="img-responsive product-img"/></div>
                <div class="col-sm-9">
                  <h5 class="nomargin">{{item.product.name}}</h5>
                </div>
							</div>
						</td>
            <td data-th="Price" class="text-center">${{item.product.unit_price}}</td>
            <td data-th="Quantity" class="text-center">
              <div class="input-group inline-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary btn-minus" @click="quantity = Math.max(1, --item.quantity)">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input class="form-control quantity" min="1" name="quantity" type="number" :value="item.quantity">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary btn-plus" @click="++item.quantity">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </td>
            <td v-if="item.discount !== 0" data-th="Discount" class="text-center">{{Math.floor(item.discount * 100)}}%</td>
            <td v-else data-th="Discount" class="text-center">-</td>
            <td data-th="Subtotal" class="text-center">${{((1 - item.discount) * item.product.unit_price * item.quantity).toFixed(2)}}</td>
            <td class="actions" data-th="">
							<button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
							<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
						</td>
          </tr>
        </tbody>
        <tfoot>
          <!-- <tr class="visible-xs">
            <td class="text-center"><strong>Total 1.99</strong></td>
          </tr> -->
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
import router from '../router/index.js'
import { mapState } from 'vuex'

export default {
  name: 'Cart',

  components: {
    Navbar
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
  .product-img {
    max-height: 80px;
    max-width: 80px;
  }

  .container {
    padding-top: 15px;
    background: #fff;
    box-shadow: 0 .2rem .4rem rgba(0,0,0,.4);
  }

  .table th {
    border-top: none;
  }

  .inline-group .form-control {
  text-align: center !important;
} 

.inline-group {
  max-width: 9rem;
}

.inline-group .form-control {
  text-align: right;
}

.btn-plus, .btn-minus {
  padding: .1rem .1rem;
}

.form-control[type="number"]::-webkit-inner-spin-button,
.form-control[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>