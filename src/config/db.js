import mongoose from "mongoose";
import { objectConfig } from "../dotenv.config.js";

/* const password = objectConfig.mongoPassword */

const password = '4F4ZJdNwWpQy9kl1'

export const connect = ()=>{
    mongoose.connect(`mongodb+srv://jsimbrenda:${password}@papelerasangerardo.wphphau.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=papeleraSanGerardo`)
}