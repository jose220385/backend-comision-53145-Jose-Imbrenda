import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        },
    last_name: {
        type: String,
        required: true,
        },
    email:{
        type: String,
        required: true,
        index:true
        },
    password:{
        type: String,
        required: true
        },
    role: {
        type: String,
        default: 'user'
        },
});

export const userModel = mongoose.model(collection, schema);