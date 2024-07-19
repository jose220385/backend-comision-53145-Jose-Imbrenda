import {Schema, model} from "mongoose";

const collection = "carts";

const schema = new Schema({
  products:{
    type:[{
      productId:{
        type: Schema.Types.ObjectId,
        ref:'products'
      },
      quantity: Number
  }]
}
});

schema.pre('findById', function(){
  this.populate('products.productId')
})

schema.pre('find', function(){
  this.populate('products.productId')
})

export const cartModel = model(collection, schema);