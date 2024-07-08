//import MDBProductManager from "../dao/MongoDB.ProductManager"
import {productService} from '../service/index.js'


class ProductsController{
    constructor(){
        this.productService = productService
    }

getProducts    = async (req,res)=>{
    try {
        const {newPage, limit} = req.query
        const filter={}
        
        if(req.query.category) filter.category = req.query.category
        if(req.query.subCategory) filter.subCategory = req.query.subCategory
        if(req.query.brand) filter.brand = req.query.brand
        if(req.query.order) filter.order = req.query.order
        if(req.query.status) filter.status = req.query.status

        const products = await this.productService.getProducts({limit, newPage},filter)
    
        res.send({status: 'success', payload: products})
    } catch (error) {
        console.log(error);
    }   
}

getProduct     = async (req,res)=>{
    try {
        const {pid} = req.params
        const productFound = await this.productService.getProductById(pid)
        if(!productFound){
            return res.status(404).send({status:'error', error: 'Producto no encontrado'})
        }
    res.send({status: 'success', payload: productFound})
    } catch (error) {
        console.log(error);
    }
}

createProduct  = async (req,res)=>{
    try {
        res.send(await this.productService.addProduct(req.body))
        const {io} = req
        io.emit('realTimeProducts', await this.productService.getProducts())
    } catch (error) {
        console.log(error);
    }
}

updateProduct  = async (req,res)=>{
    try {
        const {pid} = req.params
        res.send(await this.productService.updateProduct(pid,req.body))
        const {io} = req
        io.emit('realTimeProducts-upload', await this.productService.getProducts())
    } catch (error) {
        console.log(error);
    }
}

deleteProduct  = async(req,res)=>{
    try {
        const {pid} = req.params
        res.send(await this.productService.deleteProduct(pid))
        const {io} = req
        io.emit('realTimeProducts-delete', await this.productService.getProducts())
    } catch (error) {
        console.log(error);
    }   
}

changePrice = async (req,res)=>{
    try {
        const {changeCondition, category, subCategory, brand, percentaje} = req.query
        const filter = {category, subCategory, brand, changeCondition, percentaje}
        res.send(await this.productService.changePrice(filter))
        //Falta terminar la logica
    } catch (error) {
        console.log(error);
    }
    /* const {io} = req
    io.emit('realTimeProducts-upload', await productService.getProducts()) */
}

}

export default ProductsController