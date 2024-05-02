import mongoose from "mongoose";

const collection = "messages";

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
      },
      message: {
        type: String,
      }
});

export const messageModel = mongoose.model(collection, schema);