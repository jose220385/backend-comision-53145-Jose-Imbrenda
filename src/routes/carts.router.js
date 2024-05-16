import { Router } from "express";
//import CartManager from '../dao/FS.CartManager.js'
//import { isExist} from "../utils.js";
import MDBCartManager from "../dao/MongoDB.CartManager.js";
import { __dirname } from "../utils/utils.js";

const router = new Router() 
const cartManager = new MDBCartManager();

router.get('/:cid', async (req,res)=>{
    const {cid} = req.params
    const ProductsByCartId = await cartManager.getProductsByCartId(cid)
    if(!ProductsByCartId){return res.status(404).send({status:'error', error: 'Carrito no encontrado'})}
    res.send({status: 'success', payload: ProductsByCartId})
})

router.get('/carts/all', async (req,res)=>{
    const carts = await cartManager.getCarts()
    res.send({status: 'success', payload: carts})
})

router.post('/', async (req,res)=>{
    await cartManager.addCart()
    res.send({status: 'success', payload: 'Carrito creado satisfactoriamente'})
})

router.post('/:cid/products/:pid', async (req,res)=>{
    const {cid} = req.params
    const {pid} = req.params
    const{quantity}=req.body
    res.send(await cartManager.addProductToCart(cid,quantity,pid))
})

router.delete('/:cid/products/:pid', async (req,res)=>{
    const {cid} = req.params
    const {pid} = req.params
    res.send(await cartManager.deleteProductFromCart(cid,pid))
    const {io} = req
    io.emit('cartView-deleteProduct', await cartManager.getProductsByCartId(cid))
})



export default router