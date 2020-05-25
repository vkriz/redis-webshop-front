<template>
  <tr id="cartproduct">
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
          <button class="btn btn-outline-secondary btn-minus" @click="decreaseQuantity">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input class="form-control quantity" min="1" name="quantity" type="number" v-model="item.quantity">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary btn-plus" @click="increaseQuantity">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td data-th="Discount" class="text-center">{{discount}}</td>
    <td data-th="Subtotal" class="text-center">${{calculatePrice()}}</td>
    <td class="actions" data-th="">
      <button class="btn btn-info btn-sm" title="Update quantity" @click="saveChanges"><i class="fa fa-refresh"></i></button>
      <button class="btn btn-danger btn-sm" title="Remove from cart" @click="removeFromCart"><i class="fa fa-trash-o"></i></button>								
    </td>
  </tr>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductCart',

  props: {
    item: Object,
    index: Number
  },

  data: function() {
    return {
      loaded: false      
    }
  },

  computed: {
    ...mapState([
      'apiUrl',
      'username',
      'cart'
    ]),

    discount: function() {
      this.calculatePrice()
      if(this.item.quantity === 1) {
        return "-";
      }

      if(this.item.quantity === 2) {
        return "10%"
      }
      
      return "20%"
    }
  }, 

  methods: {
     ...mapActions([
      'updateCartProduct',
      'removeCartProduct'
    ]),

    increaseQuantity: function() {
      this.item.quantity = Math.max(1, ++this.item.quantity)
      this.calculatePrice()  
    },

    decreaseQuantity: function() {
      this.item.quantity = Math.max(1, --this.item.quantity)
      this.calculatePrice()
    },

    calculatePrice: function() {
      if(this.item.quantity === 1) {
        this.item.discount = 0
        this.item.price = ((1 - this.item.discount) * this.item.product.unit_price * this.item.quantity).toFixed(2)
      } else if(this.item.quantity === 2) {
        this.item.discount = 0.1
        this.item.price = ((1 - this.item.discount) * this.item.product.unit_price * this.item.quantity).toFixed(2)
      } else {
        this.item.discount = 0.2
        this.item.price = ((1 - this.item.discount) * this.item.product.unit_price * this.item.quantity).toFixed(2)
      }

      return this.item.price
    },

    saveChanges: function() {
      this.saved = false;
      this.saving = true;

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
          this.updateCartProduct({index: this.index, item: this.item})
        })

      this.saved = true;
      this.saving = false;
    },

    removeFromCart: function() {
      if(confirm("Are you sure you want to remove this product from your cart?")) {
        //this.cart.splice(index, 1);
        this.removeCartProduct(this.index);
      }
    }
  }
}
</script>

<style scoped>

  .product-img {
    max-height: 80px;
    max-width: 80px;
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
