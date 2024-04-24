import { Router } from "express";
import ProductManager from '../classes/ProductManager.js'

const router = new Router()
const productManager = new ProductManager();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts()
    res.render('home', {
        title: 'Productos',
        products,
        styles: 'homeStyles.css'
    })
})

router.get('/realTimeProducts', async (req,res)=>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products : products,
        styles: 'homeStyles.css'
    })
})


export default router