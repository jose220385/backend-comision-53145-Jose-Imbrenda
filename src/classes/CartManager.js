import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { __dirname } from '../utils.js';
import { readFile, writeFile } from "../utils.js";

export default class CartManager {
    constructor() {
      (this.path = `${__dirname}/carts.json`)
    }

      addCart = async()=>{
        try {

            const carts = await readFile(this.path)
      
            const newCart = {
              id: uuidv4(),
              products: []
            };
            await carts.push(newCart);
      
            await writeFile(carts,this.path)
      
          } catch (error) {
            console.log(error);
          }
        };

        getProductsByCartId = async(id) =>{
            try{
            const carts = await readFile(this.path)
            const cartFound = carts.find((cart) => cart.id === id);
            
            return cartFound.products;
          } catch (error) {
            console.log(error);
          }
        }

      

      addProductToCart = async (cid,quantity,pid) =>{
        try{
            const carts = await readFile(this.path)
            
            const cartIndex = carts.findIndex(c => c.id === cid)

            const productIndex = carts[cartIndex].products.findIndex(p => p.productId === pid)

            if(productIndex<0){ 
                const productToAdd = {
                    productId: pid,
                    quantity: quantity
                }
                carts[cartIndex].products.push(productToAdd)
                await writeFile(carts,this.path)
                return
            }

            carts[cartIndex].products[productIndex].quantity += quantity

            await writeFile(carts,this.path)

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

