<template>
  <div id="product" class="col-md-3">
    <div >
      <img class="product-image" :src="product.image" alt="Product image">
      <p class="mt-2 mb-1">{{ product.name }}</p>
      <p>{{ product.unit_price }}$</p>
    </div>

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#invModal">Buy</button>

    <div class="modal" id="invModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="fa fa-times"></i></span>
            </button>
          </div> <!-- modal-header -->
          <div class="modal-body">
            <img class="product-image float-left" :src="product.image" alt="Product image">
            <div class="buy">
              <p class="text-left mb-1">{{ product.name }}</p>
              <p class="text-left mb-1">Unit price: {{ product.unit_price }}$</p>
              <p class="text-left mb-4">Total price: {{ quantity * product.unit_price }}$</p>
              <div class="input-group inline-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary btn-minus" @click="--quantity">
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
            </div>
          </div> <!-- modal-body -->
          <div class="modal-footer">
            <button class="btn btn-secondary mr-auto" data-dismiss="modal">Close</button>
            <button class="btn btn-primary float-right" data-dismiss="modal">Add to cart</button>
          </div> <!-- modal-footer -->
        </div> <!-- modal-content -->
      </div> <!-- modal-dialog -->
    </div> <!-- modal -->
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: Object
  },
  data: function() {
    return {
      showModal: false,
      quantity: 1
    }
  }
}
</script>

<style scoped>
.buy {
  padding-left: 210px;
}
/* input.form-control {
  max-width: 35px;
  padding: 0;
}*/
.inline-group .form-control {
  text-align: center !important;
} 
.product-image {
  max-width: 200px;
  max-height: 200px;
}

.inline-group {
  max-width: 9rem;
  padding: .5rem;
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
</style>
