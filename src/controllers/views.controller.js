import { brandService, cartService, categoryService, messageService, productService } from "../service/index.js";
import  {generateProducts}  from "../utils/generateProducts.js";
import logger from "../utils/loggers.js";
import { objectConfig } from "../dotenv.config.js"
import  jwt  from "jsonwebtoken"

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
            logger.error(error.message)
        }
    }

    productsView = async (req,res)=>{
        try {
            delete req.session.ticket
            console.log(req.session.ticket);
            const userName = req.user?.first_name
            const cid = req.user?.cart
            const email = req.user?.email
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
                email,
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
            logger.error(error.message)
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
            logger.error(error.message)
        }
    }

    productViewById = async (req,res)=>{
        try {
            const cid = req.user?.cart
            const {pid} = req.params
            const product = await this.productService.getProductById(pid)
            res.render('productView', {...product, cid, styles:"productStyles.css"})
        } catch (error) {
            logger.error(error.message)
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
            logger.error(error.message)
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
            logger.error(error.message)
        }
    }

    loginView = async (req,res)=>{
        try {
            res.render('login', {
                title: 'Login:',
                styles: 'homeStyles.css'
            })
        } catch (error) {
            logger.error(error.message)
        }  
    }

    registerView = async (req,res)=>{
        try {
            res.render('register',{
                title: 'Register',
                styles: 'homeStyles.css'
            })
        } catch (error) {
            logger.error(error.message)
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
            logger.error(error.message)
            }
    }

    productMockView = async(req,res) =>{
        try {
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
        } catch (error) {
            logger.error(error.message)
        }
        
    }

    sendMailPasswordRecovery = async(req,res) =>{
        try {
            res.render('sendMailPasswordRecovery',{
                title: 'SendRecoveryMail:',
                styles: 'homeStyles.css'
            })
        } catch (error) {
            logger.error(error.message)
        }
    }
    
    changePasswordView = async(req,res) =>{
        try {
            const { token } = req.params;
            console.log(token);
            console.log(objectConfig.jwtSecret);
            const decoded = jwt.verify(token, objectConfig.jwtSecret);
            console.log(decoded);
            res.render('changePasswordView',{
                title: 'ChangePassword:',
                styles: 'homeStyles.css'
            })
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.render('expiredToken',{
                    title: 'expiredToken:',
                    styles: 'homeStyles.css'
                });
              } else {
                res.status(400).send('Token inválido.');
              }
        }
        
        
    }

    loggerTest = async(req,res) =>{
        try {
            logger.fatal("Error Fatal")
            logger.error("Error")
            logger.warning("Advertencia")
            logger.info('Log de informacion')
            logger.http('Log de http')
            logger.debug('log de depuracion')
            res.send("Test de loggers completado")
        
        } catch (error) {
            logger.error(error.message)
        }
        
    }

}



export default ViewsController