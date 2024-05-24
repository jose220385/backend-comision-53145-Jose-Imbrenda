import { Router } from "express";
//import ProductManager from '../dao/MongoDB.ProductManager.js'
import MDBProductManager from "../dao/MongoDB.ProductManager.js";
import { messageModel } from "../dao/models/message.model.js";
import MDBCartManager from "../dao/MongoDB.CartManager.js";
const router = new Router()
const productManager = new MDBProductManager();
const cartManager = new MDBCartManager()

router.get('/products', async (req,res)=>{
    //const products = await productManager.getProducts()

    const {newPage, limit} = req.query
    const {category, subCategory, brand, order, status} = req.query
    const filter = {category, subCategory, brand, order, status}

    const{docs, page,hasPrevPage, hasNextPage,prevPage,nextPage} = await productManager.getProducts({limit, newPage},filter)
    const brands = await productManager.getBrands()
    const categories = await productManager.getCategories()

    res.render('products', {
        title: 'Productos',
        styles: 'homeStyles.css',
        products: docs,
        page,
        hasPrevPage, 
        hasNextPage,
        prevPage,
        nextPage,
        brands,
        categories,
        category,
        subCategory,
        brand,
        order,
        status
    })
})

router.get('/realTimeProducts', async (req,res)=>{
    const {newPage, limit} = req.query
    const {category, subCategory, brand, order, status} = req.query
    const filter = {category, subCategory, brand, order, status}
    const {docs, page,hasPrevPage, hasNextPage,prevPage,nextPage} = await productManager.getProducts({limit, newPage},filter)
    const brands = await productManager.getBrands()
    const categories = await productManager.getCategories()
    res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products : docs,
        styles: 'homeStyles.css',
        categories,
        brands,
        page,
        hasPrevPage, 
        hasNextPage,
        prevPage,
        nextPage,
    })
})

router.get('/products/:pid', async (req,res)=>{
    const {pid} = req.params
    const product = await productManager.getProductById(pid)
    res.render('productView', {...product, styles:"productStyles.css"})
})

router.get('/carts/:cid', async (req,res)=>{
    const {cid} = req.params
    const {_id, products} = await cartManager.getProductsByCartId(cid)
    res.render('cartView', {
        cartId: _id,
        products,
        styles:"cartStyles.css"
    })
})

router.get('/chat', async (req,res)=>{
    const messages = await messageModel.find().lean()
    res.render('chat', {
        title: 'Chat:',
        messages,
        styles: 'homeStyles.css'
    })
})


export default router