
import { v4 as uuidv4 } from 'uuid';
import { __dirname } from '../utils/utils.js';
import { readFile, writeFile } from "../utils/utils.js";
import {dirname} from "path"
import { cartModel } from './models/cart.model.js';
import { productModel } from './models/product.model.js';


export default class MDBCartManager {
    constructor() {
      (this.path = `${dirname(__dirname)}/carts.json`)
    }

      addCart = async()=>{
        try {
            const newCart = await cartModel.create({products: []})
            return ({status: "success", payload: newCart})
          } catch (error) {
            console.log(error);
          }
        };

        getProductsByCartId = async(id) =>{
            try{
            const cartFound = await cartModel.findById(id).populate('products.productId').lean().exec()
            //const cartFound = await cartModel.find({_id:id}).lean() ==> No funciona el middleware
            return cartFound
          } catch (error) {
            console.log(error);
          }
        }

      getCarts = async ()=>{
        const carts = await cartModel.find().lean()
        return carts
      }

      addProductToCart = async (cid,quantity,pid) =>{
        try{
            const query = cartModel.where({ _id: cid, 'products.productId':pid })
            const productExist = await query.findOne()

            if(!productExist){
                const cart = await cartModel.findOneAndUpdate(
                { _id: cid},
                { $addToSet: { products: { productId: pid, quantity} } },
                { new: true })
                return ({status: "success", payload: cart})
            }
            
            const addProduct = await cartModel.findOneAndUpdate(
              { _id: cid, 'products.productId':pid },
              { $inc: { 'products.$.quantity': quantity }}, 
              { new: true,upsert: true })
              return ({status: "success", payload: addProduct})
            
            
          } catch (error) {
            console.log(error);
          }
        }

      deleteProductFromCart = async(cid,pid) =>{
          try {
            await cartModel.findByIdAndUpdate(
                cid,
                { $pull: { products: { productId: pid } } },
                { new: true }
            )
          return ({status: "success", payload: "Producto eliminado del carrito"})
        }
          catch (error) {
          console.log(error);
        }
      }




      }

        // pruebas

       /*  const cartManager = new CartManager()

        const test = async () =>{
            //await cartManager.addCart()
            //await cartManager.addProductToCart("f7e57d21-c101-487f-b7f1-4473c9b148aa",2,"bfabfa40-8976-4d37-a737-1cb028e99163")
            const products = await cartManager.getProductsByCartId("f7e57d21-c101-487f-b7f1-4473c9b148aa")
            console.log(products)  
        }
        
        test()  */

