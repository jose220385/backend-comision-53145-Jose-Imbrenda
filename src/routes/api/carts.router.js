import { Router } from "express";
import CartsController from "../../controllers/carts.controller.js";

const router = new Router() 

const{
    getProductsByCartId,
    getCarts,
    addCart,
    addProductToCart,
    deleteProductFromCart,
    changeProductQuantity,
    purchaseCart
} = new CartsController()

router.get('/:cid', getProductsByCartId)

router.get('/carts/all', getCarts)

router.post('/', addCart)

router.post('/:cid/products/:pid', addProductToCart)

router.put('/:cid/changeQ/:pid', changeProductQuantity)

router.get('/:cid/purchase', purchaseCart)

router.delete('/:cid/products/:pid', deleteProductFromCart)

export default router