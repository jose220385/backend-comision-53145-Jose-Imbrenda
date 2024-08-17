import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
cost:{
  type: Number,
    required: true
},
markdown: {
  type: Number,
  required: true
},
  price: {
    type: Number,
    required: true,
  },
  thumbnail: String,
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  brand: {
    type: String
  },
  provider: String,
  status: Boolean,
  owner:{
    type:String
  }
});

schema.plugin(mongoosePaginate)

export const productModel = mongoose.model(collection, schema);
