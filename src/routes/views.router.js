import { Router } from "express";

import { auth } from "../middlewares/auth.middleware.js";
//import { passportCall } from "../utils/passportCall.js";
//import { authorization } from "../utils/authorizationJWT.js";
import ViewsController from "../controllers/views.controller.js";

const router = new Router()

const{
    homeView,
    productsView,
    realTimeProductsView,
    productViewById,
    cartViewById,
    chatView,
    loginView,
    registerView
}= new ViewsController()

router.get('/', homeView) 

router.get('/products', /* passportCall('jwt') */ productsView)

router.get('/realTimeProducts', /* passportCall('jwt'), */ auth, realTimeProductsView)

router.get('/products/:pid', productViewById)

router.get('/carts/:cid', /* passportCall('jwt'), */ cartViewById)

router.get('/chat', /* passportCall('jwt'), */ chatView)

//vistas para login y register
router.get('/login', loginView)

router.get('/register', registerView)

/* router.get('/logout', async (req,res)=>{
    res.render('login', {
        title: 'Login:',
        styles: 'homeStyles.css'
    })
}) */


export default router