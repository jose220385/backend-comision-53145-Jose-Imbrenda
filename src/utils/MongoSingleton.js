import {connect} from "mongoose";
import { objectConfig } from "../dotenv.config.js";


export class MongoSingleton {
    static #instance
    constructor(){
        connect(objectConfig.mongoURL)
    }

    static getInstance(){
        if(this.#instance){
            console.log('Base de datos ya conectada');
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Base de datos conectada');
        return this.#instance
    }
}