import {Schema, model} from "mongoose";

const collection = "users";

const schema = new Schema({
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
    cart:{
        type: Schema.Types.ObjectId,
        ref:'carts'
    },
    age: Number
});

export const userModel = model(collection, schema);