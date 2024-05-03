
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
            const cartFound = await cartModel.findById(id).lean()
            return cartFound.products
          } catch (error) {
            console.log(error);
          }
        }

      

      addProductToCart = async (cid,quantity,pid) =>{
        try{
            /* const carts = await readFile(this.path)
            const products = await readFile(`${dirname(__dirname)}/products.json`)

            const cartIndex = carts.findIndex(c => c.id === cid)
            if(cartIndex < 1) return ({status: 'error', error:`No existe el carrito solicitado`})

            const existProduct = products.some(p => p.id === pid)
            if(!existProduct) return({status: 'error', error:`No existe el producto solicitado`})

            const productIndex = carts[cartIndex].products.findIndex(p => p.productId === pid)

            if(productIndex<0){ 
                const productToAdd = {
                    productId: pid,
                    quantity: quantity
                }
                carts[cartIndex].products.push(productToAdd)
                await writeFile(carts,this.path)
                return ({status:"success", payload: productToAdd})
            }

            carts[cartIndex].products[productIndex].quantity += quantity

            await writeFile(carts,this.path) */

            const cart = await cartModel.findOneAndUpdate(
              { _id: cid, 'products.id':pid },
              /* { $addToSet: { products: { id: pid, quantity} } }, */
              { $inc: { 'products.$.quantity': quantity }}, 
              { new: true })
            
              return ({status: "success", payload: cart})
          } catch (error) {
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

