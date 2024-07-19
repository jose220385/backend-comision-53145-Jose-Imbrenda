import mongoose from "mongoose";
import {objectConfig} from "../dotenv.config.js";
import { MongoSingleton } from "../utils/MongoSingleton.js";

/* const password = objectConfig.mongoPassword */

//const password = '4F4ZJdNwWpQy9kl1'

export const connect = ()=>{
    //mongoose.connect(objectConfig.mongoURL.toString())
    MongoSingleton.getInstance()
}