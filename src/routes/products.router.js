import { Router } from "express";
import ProductManager from '../classes/ProductManager.js'
//import { isExist } from "../utils.js";
import { __dirname } from "../utils.js";
import { readFile } from "../utils.js";

const router = new Router() 
const productManager = new ProductManager();



router.get('/', async (req,res)=>{
    let {limit} = req.query
    const products = await productManager.getProducts()
    if(limit){
        const limitedProducts = products.slice(0,limit)
        return res.send({status: 'success', payload: limitedProducts})
    }
    res.send({status: 'success', payload: products})
})
router.get('/:pid', async (req,res)=>{
    const {pid} = req.params
    const productFound = await productManager.getProductById(pid)
    if(!productFound){
        return res.status(404).send({status:'error', error: 'Producto no encontrado'})
    }
    res.send({status: 'success', payload: productFound})
})

router.post('/', async (req,res)=>{
    res.send(await productManager.addProduct(req.body))
    const {io} = req
    io.emit('realTimeProducts', await productManager.getProducts())
})

router.put('/:pid', async (req,res)=>{
    const {pid} = req.params
    res.send(await productManager.updateProduct(pid,req.body))
    const {io} = req
    io.emit('realTimeProducts-upload', await productManager.getProducts())
})

router.delete('/:pid', async(req,res)=>{
    const {pid} = req.params
    res.send(await productManager.deleteProduct(pid))
    const {io} = req
    io.emit('realTimeProducts-delete', await productManager.getProducts())
})


export default router