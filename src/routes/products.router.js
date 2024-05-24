import { Router } from "express";
import MDBProductManager from "../dao/MongoDB.ProductManager.js";
import { __dirname } from "../utils/utils.js";

const router = new Router() 
const mdbProductManager = new MDBProductManager();

router.get('/', async (req,res)=>{
    let {limit} = req.query
    /* const products = await mdbProductManager.getProducts()
    if(limit){
        const limitedProducts = products.slice(0,limit)
        return res.send({status: 'success', payload: limitedProducts})
    } */
    const{docs, page,hasPrevPage, hasNextPage,prevPage,nextPage} = await mdbProductManager.getProducts()
    res.send({status: 'success', payload: products})
})
router.get('/:pid', async (req,res)=>{
    const {pid} = req.params
    const productFound = await mdbProductManager.getProductById(pid)
    if(!productFound){
        return res.status(404).send({status:'error', error: 'Producto no encontrado'})
    }
    res.send({status: 'success', payload: productFound})
})

router.post('/', async (req,res)=>{
    res.send(await mdbProductManager.addProduct(req.body))
    const {io} = req
    io.emit('realTimeProducts', await mdbProductManager.getProducts())
})

router.put('/:pid', async (req,res)=>{
    const {pid} = req.params
    res.send(await mdbProductManager.updateProduct(pid,req.body))
    const {io} = req
    io.emit('realTimeProducts-upload', await mdbProductManager.getProducts())
})

router.delete('/:pid', async(req,res)=>{
    const {pid} = req.params
    res.send(await mdbProductManager.deleteProduct(pid))
    const {io} = req
    io.emit('realTimeProducts-delete', await mdbProductManager.getProducts())
})

router.put('/changePrice', async (req,res)=>{
    const {changeCondition, category, subCategory, brand, percentaje} = req.query
    const filter = {category, subCategory, brand, changeCondition, percentaje}
    
    res.send(await mdbProductManager.changePrice(filter))

    /* const {io} = req
    io.emit('realTimeProducts-upload', await mdbProductManager.getProducts()) */
})

//CRUD Categorias:

router.post('/categories', async (req,res)=>{
    res.send(await mdbProductManager.addCategory(req.body))
})

router.get('/categories/all', async (req,res)=>{
    res.send(await mdbProductManager.getCategories())
})

router.post('/subCategories', async (req,res)=>{
    res.send(await mdbProductManager.addSubCategory(req.body))
})

router.get('/subCategories/:catId', async (req,res)=>{
    const {catId} = req.params
    console.log("log del router"+catId);
    res.send(await mdbProductManager.getSubCategories(catId))
})

//CRUD de marcas

router.post('/brands', async (req,res)=>{
    res.send(await mdbProductManager.addBrand(req.body))
})

router.get('/brands/all', async (req,res)=>{
    res.send(await mdbProductManager.getBrands())
})


export default router