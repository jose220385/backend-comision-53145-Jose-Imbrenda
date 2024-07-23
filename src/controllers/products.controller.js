//import MDBProductManager from "../dao/MongoDB.ProductManager"
import { CustomError } from '../service/errors/CustomError.js'
import { generateProductError } from '../service/errors/info.js'
import {productService} from '../service/index.js'


class ProductsController{
    constructor(){
        this.productService = productService
    }

createProduct  = async (req,res,next)=>{
    try {
        if( !req.body.code ||
            !req.body.category || typeof req.body.category  !== 'string' ||
            !req.body.subCategory || typeof req.body.subCategory  !== 'string' ||
            !req.body.title || typeof req.body.title  !== 'string' ||
            !req.body.description || typeof req.body.description  !== 'string' ||
            !req.body.brand || typeof req.body.brand  !== 'string' ||
            !req.body.provider || typeof req.body.provider  !== 'string' ||
            !req.body.cost || typeof req.body.cost  !== 'number'||
            !req.body.markdown || typeof req.body.markdown  !== 'number'||
            !req.body.thumbnail || typeof req.body.thumbnail  !== 'string' ||
            !req.body.stock || typeof req.body.stock  !== 'number'
            ){
            //return res.status(404).send('Falta completar campos')
            CustomError.createError({
                name: 'Error al crear un Usuario',
                cause: generateProductError({
                    code : req.body.code, 
                    category : req.body.category, 
                    subCategory: req.body.subCategory, 
                    title: req.body.title, 
                    description:req.body.description,
                    brand:req.body.brand,
                    provider:req.body.provider,
                    cost:req.body.cost,
                    markdown:req.body.markdown,
                    thumbnail:req.body.thumbnail,
                    stock:req.body.stock
                }),
                    code: EError.INVALID_TYPES_ERROR
            })
            return
        }
        
        const codeValidation = await this.productService.getProductBy({code:req.body.code})
        console.log(codeValidation);
        if (codeValidation) {
            CustomError.createError({
                name: 'Codigo de Usuario existente',
                cause: duplicatedProductCodeError(req.body.code),
                code: EError.DUPLICATED_DATA_ERROR
            })
            return
            /* console.log('Error');
            return res.send({status:"Failed", payload: "El codigo corresponde a otro producto"}) */
          }
        const {code,category,subCategory,title,description,brand,provider,cost,markdown,thumbnail,stock} = req.body
        const price = cost + ((cost * markdown) / 100)
        const newProduct = await this.productService.addProduct({
            code,
            category,
            subCategory,
            title,
            description,
            brand,
            provider,
            cost,
            markdown,
            price,
            thumbnail,
            stock: parseInt(stock),
            status: true
          })
        res.send({status: "success", payload: newProduct})
        const {io} = req
        io.emit('realTimeProducts', await this.productService.getProducts({},req.filter))
    } catch (error) {
        next(error)
    }
}

getProducts    = async (req,res)=>{
    try {
        const {newPage, limit} = req.query
        const filter={}
        
        if(req.query.category) filter.category = req.query.category
        if(req.query.subCategory) filter.subCategory = req.query.subCategory
        if(req.query.brand) filter.brand = req.query.brand
        
        if(req.query.status) {
            req.query.status === "withoutStock"? filter.status = false : filter.status = true
          } 

        if(req.query.order) filter.order = req.query.order


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

updateProduct  = async (req,res)=>{
    try {
        const {pid} = req.params
        const productNotUpdated = await this.productService.getProductById(pid)
        const productToUpdate = req.body
        const cost = productToUpdate.cost === ""? productNotUpdated.cost : productToUpdate.cost
        const markdown= productToUpdate.markdown === ""? productNotUpdated.markdown : productToUpdate.markdown
        const price = cost + ((cost * markdown) / 100) 
        const updatedProduct = {
                code: productToUpdate.code === ""? productNotUpdated.code : productToUpdate.code,
                title: productToUpdate.title === ""? productNotUpdated.title : productToUpdate.title,
                description: productToUpdate.description === ""? productNotUpdated.description : productToUpdate.description,
                cost,
                markdown,
                price,
                thumbnail: productToUpdate.thumbnail === ""? productNotUpdated.thumbnail : productToUpdate.thumbnail,
                stock: productToUpdate.stock === ""? productNotUpdated.stock : productToUpdate.stock,
                category: productToUpdate.category === ""? productNotUpdated.category : productToUpdate.category,
                subCategory: productToUpdate.subCategory === ""? productNotUpdated.subCategory : productToUpdate.subCategory,
                status: true,
            }
        const result = await this.productService.updateProduct({_id:pid},updatedProduct)
        res.send({status:'success', payload: result})
        const {io} = req
        io.emit('realTimeProducts-upload', await this.productService.getProducts({},req.filter))
    } catch (error) {
        console.log(error);
    }
}

deleteProduct  = async(req,res)=>{
    try {
        const {pid} = req.params
        res.send(await this.productService.deleteProductById(pid))
        const {io} = req
        io.emit('realTimeProducts-delete', await this.productService.getProducts({},req.filter))
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

testProduct = async (req,res) =>{
    try {
        res.send(await this.productService.test())
    } catch (error) {
        console.log(error);
    }
}

}

export default ProductsController