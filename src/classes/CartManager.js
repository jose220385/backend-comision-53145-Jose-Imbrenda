import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { __dirname } from '../utils.js';

export default class CartManager {
    constructor() {
      (this.path = `${__dirname}/carts.json`)
    }

    readFile = async(path)=>{
        try{
        const file = await fs.promises.readFile(path, 'utf-8')
        return JSON.parse(file)
      } catch {
        return []
      }
      }
    
    writeFile = async(file)=>{
        try{
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(file, 'null',2),
            "utf-8")
      } catch (err){
        console.log(err)
      }
      }

      addCart = async()=>{
        try {

            const carts = await this.readFile(this.path)
      
            const newCart = {
              id: uuidv4(),
              products: []
            };
            await carts.push(newCart);
      
            await this.writeFile(carts)
      
          } catch (error) {
            console.log(error);
          }
        };

        getProductsByCartId = async(id) =>{
            try{
            const carts = await this.readFile(this.path)
            const cartFound = carts.find((cart) => cart.id === id);
            
            return cartFound.products;
          } catch (error) {
            console.log(error);
          }
        }

      

      addProductToCart = async (cid,quantity,pid) =>{
        try{
            const products = await this.readFile(`${__dirname}/products.json`)
            const carts = await this.readFile(this.path)
            
            const cartIndex = carts.findIndex(c => c.id === cid)
            console.log(cartIndex)
            //const productExist = products.some(p => p.id === pid)
  
            /* if(cartIndex<0){
            return res.status(404).send({status: 'error', error:`No se encuentra el carrito solicitado`})
            }

            if(!productExist){
            return res.status(404).send({status: 'error', error:`No existe el producto solicitado`})
            } */

            const productIndex = carts[cartIndex].products.findIndex(p => p.productId === pid)
            console.log(pid)
            //console.log(carts[cartIndex].products[0].id)
            console.log(productIndex)
            console.log(carts[cartIndex].products)

            if(productIndex<0){ 
                const productToAdd = {
                    productId: pid,
                    quantity: quantity
                }
                console.log(productToAdd)
                carts[cartIndex].products.push(productToAdd)
                await this.writeFile(carts)
                return
            }

            carts[cartIndex].products[productIndex].quantity += quantity

            await this.writeFile(carts)

          } catch (error) {
            console.log(error);
          }
        }
        }

        // pruebas

        /* const cartManager = new CartManager()

        const test = async () =>{
            //await cartManager.addCart()
            //await cartManager.addProductToCart("f7e57d21-c101-487f-b7f1-4473c9b148aa",2,"bfabfa40-8976-4d37-a737-1cb028e99163")
            const products = await cartManager.getProductsByCartId("f7e57d21-c101-487f-b7f1-4473c9b148aa")
            console.log(products) 
        }
        
        test() */

        /* const test2 = async () =>{
            await getProductsByCartId()
        } */
      
