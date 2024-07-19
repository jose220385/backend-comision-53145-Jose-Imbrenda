import {Schema, model} from "mongoose";

const collection = "tickets";

const schema = new Schema({
    code: {
        type: String,
        required: true,
        index:true,
        },
    purchase_datetime:{
        type: String,
        required: true
        },
    amount:{
        type: Number,
        required: true
        },
    items:{
        type:[{
        productId:{
          type: Schema.Types.ObjectId,
          ref:'products'
        },
        quantity: Number
    }]},
    purchaser: {
        type: String,
        required: true
        }
});

export const ticketModel = model(collection, schema);