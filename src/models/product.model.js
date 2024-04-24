import mongoose from "mongoose";

const collection = 'products'

const schema = new mongoose.Schema({
        code: {
            type: String,
            required: true
          },
        title: {
            type: String,
            required: true
          },
      description: String,
      price: {
        type: Number,
        required: true
      },
      thumbnail: String,
      stock: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      status: Boolean
})

export const productModel = mongoose.model(collection,schema)