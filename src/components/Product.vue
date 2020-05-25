<template>
  <div id="product" class="col-md-3">
    <div class="product-border">
      <img class="product-image cursor-pointer" :src="product.image" alt="Product image" data-toggle="modal" data-target="#invModal">
      <div class="d-flex product-div">
        <div class="product-info text-left first pr-1">
          <p class="mt-2 mb-1">{{ product.name }}</p>
          <p class="mb-0">{{ product.unit_price }}$</p>
        </div>
        <div class="second">
          <button type="button" @click="resetSaving" class="btn btn-info btn-buy" data-toggle="modal" :data-target="'#invModal'+ index">Buy</button>
        </div>
      </div>
    </div>
  
    <div class="modal" :id="'invModal' + index" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="fa fa-times"></i></span>
            </button>
          </div> <!-- modal-header -->
          <div class="modal-body text-left d-flex align-items-start">
            <img class="product-image-modal" :src="product.image" alt="Product image">

            <div class="product-price mt-2">
              <p class="text-left mb-1 lead">{{ product.name }}</p>
              <p class="text-left mb-3 small">Unit price: ${{ product.unit_price }}</p>

              <p class="text-left mb-1">Quantity:</p>
              <div class="input-group inline-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary btn-minus" @click="quantity = Math.max(1, --quantity)">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input class="form-control quantity" min="1" name="quantity" type="number" :value="quantity">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary btn-plus" @click="++quantity">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>

              <span class="text-danger" v-if="discount > 0">-{{discount * 100}}%</span>

              <p class="text-left mt-4">Total price: ${{ totalPrice }}</p>

              <div v-if="saved && savingError === null" class="card border-success mb-3" style="max-width: 18rem;">
                <div class="card-body text-success">
                  <p class="card-text">Product has been added to your cart.</p>
                </div>
              </div>
            </div>
          </div> <!-- modal-body -->
          <div class="modal-footer">
            <button class="btn btn-secondary mr-auto" data-dismiss="modal">Close</button>
            <button v-if="saved && savingError === null" class="btn btn-info float-right" @click="goToCart" data-dismiss="modal">Go to cart</button>
            <button v-else class="btn btn-info float-right" @click="addToCart">Add to cart</button>
          </div> <!-- modal-footer -->
        </div> <!-- modal-content -->
      </div> <!-- modal-dialog -->
    </div> <!-- modal -->
  </div>
</template>

<script>
import router from '../router/index.js'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Product',

  props: {
    product: Object,
    index: Number
  },

  data: function() {
    return {
      showModal: false,
      quantity: 1,
      savingError: null,
      saved: false
    }
  },

  computed: {
    ...mapState([
      'username',
      'cart',
      'apiUrl'
    ]),

    discount: function() {
      if(this.quantity == 1) {
        return 0
      }

      if(this.quantity == 2) {
        return 0.1
      }

      return 0.2
    },
     
    totalPrice: function() {
      return ((1 - this.discount) * this.quantity * this.product.unit_price).toFixed(2)
    }
  },

  methods: {
    ...mapActions([
      'addCartProduct',
      'updateCartProduct'
    ]),

    resetSaving: function() {
      this.savingError = null
      this.saved = false
    },

    goToCart: function() {
      router.push('/cart')
    },

    calcTotalDiscount: function(totalQuantity) {
      if(totalQuantity > 2) {
        return 0.2
      }

      if(totalQuantity == 2) {
        return 0.1
      }

      return 0
    },

    addToCart: function() {
      if(this.username === null) {
        router.push('/login');
        return;
      }

      var index = -1;
      for(var i = 0; i < this.cart.length; ++i) {
        if(this.cart[i].product.name === this.product.name) {
          index = i;
          break;
        }
      }

      if(index !== -1) {
        let newItem = {
          quantity: this.quantity + this.cart[index].quantity,
          discount: this.calcTotalDiscount(this.quantity + this.cart[index].quantity),
          product: this.product,
          price: ((1 - this.calcTotalDiscount(this.quantity + this.cart[index].quantity)) * (this.quantity + this.cart[index].quantity) * this.product.unit_price).toFixed(2)
        }
        this.updateCartProduct({index: index, item: newItem})
      } else {
        this.addCartProduct({
          quantity: this.quantity,
          discount: this.discount,
          product: this.product,
          price: ((1 - this.discount) * this.quantity * this.product.unit_price).toFixed(2)
        })
      }

      let data = {
        username: this.username,
        active: true,
        details: this.cart
      }

      axios.put(this.apiUrl + '/cart/update', data)
        .catch(error => {
          this.savingError = error
          console.log(error)
        })
        .finally(() => {
          this.saved = true
        })
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.product-image-modal {
  max-width: 200px;
  max-height: 200px;
}

.product-border {
  background: #fff;
  border: 1px solid #f2f2f2;
  box-shadow: 0 .2rem .4rem rgba(0,0,0,.4);
  padding: 15px;
  height: 100%;
}

.product-image {
  width: 100%;
}

.product-div {
  min-height: 84px;
}

.product-div .first {
  flex: 0 0 75%;
}

.product-div .second {
  flex: 1;
  position: relative;
}

.product-div .second .btn-buy {
  position: absolute;
  right: 5px;
  bottom: 0;
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

.product-image {
  display: inline-block;
}

.product-price {
  display: inline-block;
  padding-left: 15px;
}
</style>
