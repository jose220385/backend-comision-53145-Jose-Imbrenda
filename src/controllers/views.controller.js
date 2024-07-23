import { brandService, cartService, categoryService, messageService, productService } from "../service/index.js";
import  {generateProducts}  from "../utils/generateProducts.js";

class ViewsController{
    constructor(){
        this.productService = productService,
        this.brandService = brandService,
        this.categoryService = categoryService,
        this.cartService = cartService
        this.messageService = messageService
    }

    homeView = async (req,res)=>{
        try {
            if(!req.user) return res.redirect('/login')
            return res.redirect('/products')
        } catch (error) {
            console.log(error);
        }
    }

    productsView = async (req,res)=>{
        try {
            delete req.session.ticket
            console.log(req.session.ticket);
            const userName = req.user?.first_name
            const cid = req.user?.cart
            const {newPage, limit} = req.query
        
            const filter={}
            
            if(req.query.category) filter.category = req.query.category
            if(req.query.subCategory) filter.subCategory = req.query.subCategory
            if(req.query.brand) filter.brand = req.query.brand
            if(req.query.order) filter.order = req.query.order
            if(req.query.status) filter.status = req.query.status
        
            const{docs, page,hasPrevPage, hasNextPage,prevPage,nextPage} = await this.productService.getProducts({limit, newPage},filter)
            const brands = await this.brandService.getBrands()
            const categories = await  this.categoryService.getCategories()
        
            res.render('products', {
                cid,
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
        } catch (error) {
            console.log(error);
        }    
    }

    realTimeProductsView = async (req,res)=>{
        try {
            const {newPage, limit} = req.query
            const {category, subCategory, brand, order, status} = req.query
            const filter = {category, subCategory, brand, order, status}
            const {docs, page,hasPrevPage, hasNextPage,prevPage,nextPage} = await this.productService.getProducts({limit, newPage},filter)
            const brands = await this.brandService.getBrands()
            const categories = await  this.categoryService.getCategories()
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
        } catch (error) {
            console.log(error);
        }
    }

    productViewById = async (req,res)=>{
        try {
            const cid = req.user?.cart
            const {pid} = req.params
            const product = await this.productService.getProductById(pid)
            res.render('productView', {...product, cid, styles:"productStyles.css"})
        } catch (error) {
            console.log(error);
        } 
    }

    cartViewById = async (req,res)=>{
        try {
            const {cid} = req.params
            const {_id, products} = await this.cartService.getProductsByCartId(cid)
            res.render('cartView', {
            cartId: _id,
            products,
            styles:"cartStyles.css"
        })
        } catch (error) {
            console.log(error);
        }    
    }

    chatView = async (req,res)=>{
        try {
            const messages = await this.messageService.getMessages()
            res.render('chat', {
            title: 'Chat:',
            messages,
            styles: 'homeStyles.css'
        })
        } catch (error) {
            console.log(error);
        }
    }

    loginView = async (req,res)=>{
        try {
            res.render('login', {
                title: 'Login:',
                styles: 'homeStyles.css'
            })
        } catch (error) {
            
        }  
    }

    registerView = async (req,res)=>{
        try {
            res.render('register',{
                title: 'Register',
                styles: 'homeStyles.css'
            })
        } catch (error) {
            console.log(error);
        }
    }

    ticketView = async(req,res)=>{
        try {
            if (!req.session.ticket) {
                return res.status(400).send("No hay ticket en la sesión");
            }
            const{totalPurchase, productsWithStock,productsWithoutStock} = req.session?.ticket
            const productsWithoutStockExist = productsWithoutStock.length>0?true:false
            res.render('ticket',{
                title: 'Ticket',
                styles:"cartStyles.css",
                totalPurchase,
                productsWithStock,
                productsWithoutStock,
                productsWithoutStockExist
            })
        } catch (error) {
            console.log(error);
            }
    }

    productMockView = async(req,res) =>{
        let products = []
        for (let index = 0; index < 100; index++) {
            const product = await generateProducts()
            products.push(product)
        }
        
        //productsMock = generateProducts()
        res.render('productMock',{
            title: 'MockProducts',
            styles:"homeStyles.css",
            products,
        })
    }

}



export default ViewsController