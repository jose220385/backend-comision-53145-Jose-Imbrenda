import { Router } from "express";
import ProductManager from '../classes/ProductManager.js'

const router = new Router() //se puede poner solo Router()
//const path = '../../products.json'
const productManager = new ProductManager();

router.get('/', async (req,res)=>{
    let {limit} = req.query
    const products = await productManager.getProducts()
    if(limit){
        const limitedProducts = products.slice(0,limit)
        res.send({status: 'success', payload: limitedProducts})
    }
    res.send({status: 'success', payload: products})
})
router.get('/:pid', async (req,res)=>{
    const {pid} = req.params
    const productFound = await productManager.getProductById(pid)
    if(!productFound){res.status(404).send({status:'error', error: 'Producto no encontrado'})}
    res.send({status: 'success', payload: productFound})
})
router.post('/', async (req,res)=>{
    const{code, title, description, price, stock}=req.body
    if (!code || !title || !description || !price || !stock) {
        return res.send({status:'error', error:'Faltan Campos'})
    }
    await productManager.addProduct(req.body)
    res.send({status: 'success', payload: req.body})
})
router.put('/:pid', async (req,res)=>{
    const {pid} = req.params
    await productManager.updateProduct(pid,req.body)
    res.send({status: 'success', payload: req.body})
})


export default router