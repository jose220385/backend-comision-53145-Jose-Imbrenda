import { Router } from "express";
//import ProductManager from '../dao/MongoDB.ProductManager.js'
import MDBProductManager from "../dao/MongoDB.ProductManager.js";
import { messageModel } from "../dao/models/message.model.js";
import MDBCartManager from "../dao/MongoDB.CartManager.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = new Router()
const productManager = new MDBProductManager();
const cartManager = new MDBCartManager()


router.get('/',async (req,res)=>{
    if(!req.session.user) return res.redirect('/login')
    return res.redirect('/products')
}) 

router.get('/products', async (req,res)=>{
    const userName = req.session?.user?.name
    const {newPage, limit} = req.query

    const filter={}
    
    if(req.query.category) filter.category = req.query.category
    if(req.query.subCategory) filter.subCategory = req.query.subCategory
    if(req.query.brand) filter.brand = req.query.brand
    if(req.query.order) filter.order = req.query.order
    if(req.query.status) filter.status = req.query.status

    const{docs, page,hasPrevPage, hasNextPage,prevPage,nextPage} = await productManager.getProducts({limit, newPage},filter)
    const brands = await productManager.getBrands()
    const categories = await productManager.getCategories()

    res.render('products', {
        userName,
        userNotExist: userName? false:true,
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
        category: filter.category,
        subCategory: filter.subCategory,
        brand: filter.brand,
        order: filter.order,
        status: filter.status
    })
})

router.get('/realTimeProducts', auth, async (req,res)=>{
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

//vistas para login y register
router.get('/login', async (req,res)=>{
    res.render('login', {
        title: 'Login:',
        styles: 'homeStyles.css'
    })
})

router.get('/register', async (req,res)=>{
    res.render('register',{
        title: 'Register',
        styles: 'homeStyles.css'
    })
})

/* router.get('/logout', async (req,res)=>{
    res.render('login', {
        title: 'Login:',
        styles: 'homeStyles.css'
    })
}) */


export default router