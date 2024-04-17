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
 /*    const{code, title, description, price, stock}=req.body
    if (!code || !title || !description || !price || !stock) {
        return res.send({status:'error', error:'Faltan Campos'}) 
    }
     */
    /* const result = await productManager.addProduct(req.body)
    if(result.status === 'failed') return res.send(result) */
    

    /* await productManager.addProduct(req.body)
    res.send({status: 'success', payload: req.body}) */
    
    
    
    res.send(await productManager.addProduct(req.body))
    const {io} = req
    io.emit('realTimeProducts', await productManager.getProducts())
    //socket.emit('realTimeProducts', readFile(`${__dirname}/products.json`))
})

router.put('/:pid', async (req,res)=>{
    const {pid} = req.params
    /* const existProduct = await isExist(pid,`${__dirname}/products.json`)
    if(!existProduct){
        return res.status(404).send({status: 'error', error:`No se ha encontrado el producto que desea modificar`})
    } */
    res.send(await productManager.updateProduct(pid,req.body))
})

router.delete('/:pid', async(req,res)=>{
    const {pid} = req.params
    /* const existProduct = await isExist(pid,`${__dirname}/products.json`)
    if(!existProduct){
        return res.status(404).send({status: 'error', error:`No se ha encontrado el producto que desea borrar`})
    }
    await productManager.deleteProduct(pid) */
    res.send(await productManager.deleteProduct(pid))

})


export default router