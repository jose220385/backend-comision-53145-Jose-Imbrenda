import { Router } from "express";

import { auth, authUser } from "../middlewares/auth.middleware.js";
//import { passportCall } from "../utils/passportCall.js";
//import { authorization } from "../utils/authorizationJWT.js";
import ViewsController from "../controllers/views.controller.js";
import compression from 'express-compression'

const router = new Router()

const{
    homeView,
    productsView,
    realTimeProductsView,
    productViewById,
    cartViewById,
    chatView,
    loginView,
    registerView,
    ticketView,
    productMockView
}= new ViewsController()

router.get('/', homeView) 

router.get('/products', /* passportCall('jwt') */ productsView)

router.get('/realTimeProducts', /* passportCall('jwt'), */ auth, realTimeProductsView)

router.get('/products/:pid', productViewById)

router.get('/carts/:cid', /* passportCall('jwt'), */ authUser, cartViewById)

router.get('/chat', /* passportCall('jwt'), */ authUser, chatView)

//vistas para login y register
router.get('/login', loginView)

router.get('/register', registerView)

router.get('/ticket', authUser, ticketView)

router.get('/mockingproducts',compression(), productMockView)

/* router.get('/logout', async (req,res)=>{
    res.render('login', {
        title: 'Login:',
        styles: 'homeStyles.css'
    })
}) */


export default router