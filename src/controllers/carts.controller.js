import { cartService } from "../service/index.js";


class CartsController {
    constructor(){
        this.cartService = cartService
    }

    getProductsByCartId = async (req,res)=>{
        try {
            const {cid} = req.params
            const ProductsByCartId = await cartManager.getProductsByCartId(cid)
            if(!ProductsByCartId){return res.status(404).send({status:'error', error: 'Carrito no encontrado'})}
            res.send({status: 'success', payload: ProductsByCartId})
        } catch (error) {
            console.log(error);
        }
           
    }

    getCarts = async (req,res)=>{
        try {
            const carts = await cartManager.getCarts()
            res.send({status: 'success', payload: carts})
        } catch (error) {
            console.log(error);
        }
        
    }

    addCart = async (req,res)=>{
        try {
            await cartManager.addCart()
            res.send({status: 'success', payload: 'Carrito creado satisfactoriamente'})
        } catch (error) {
            console.log(error);
        }
    }
       

    addProductToCart = async (req,res)=>{
        try {
            const {cid} = req.params
            const {pid} = req.params
            const{quantity}=req.body
            res.send(await cartManager.addProductToCart(cid,quantity,pid))
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductFromCart = async (req,res)=>{
        try {
            const {cid} = req.params
            const {pid} = req.params
            res.send(await cartManager.deleteProductFromCart(cid,pid))
            const {io} = req
            io.emit('cartView-deleteProduct', await cartManager.getProductsByCartId(cid))
        } catch (error) {
            console.log(error);
        }
        
        
    }

}

export default CartsController

