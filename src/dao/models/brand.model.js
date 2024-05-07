import mongoose from "mongoose";

const collection = "brands";

const schema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    unique: true,
  }
});

export const brandModel = mongoose.model(collection, schema);