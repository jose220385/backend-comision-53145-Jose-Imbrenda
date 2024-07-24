import { Router } from "express";
import { uploader } from "../utils/multer.js";
import { __dirname } from "../utils/utils.js";
import xlsx from "xlsx"
//import { productModel } from "../dao/models/product.model.js";
//import ProductManager from '../dao/MongoDB.ProductManager.js'
//import MDBProductManager from "../../dao/MongoDB.ProductManager.js";
import {dirname} from "path"
import { productService } from "../service/index.js";
import logger from "../utils/loggers.js";

class UploadController {
    constructor(){
        this.productService = productService
    }

    uploadFile = async (req,res)=>{
        try {
            if(!req.file){
                await res.send ({status:"Failed", payload: "No se ha adjuntado ningun archivo"})
            }
            const filePath = `${dirname(__dirname)}/public/uploads/${req.file.filename}`
        
            const excelFile = await xlsx.readFile(filePath)
        
            const sheetName = excelFile.SheetNames[0];
            const sheet = excelFile.Sheets[sheetName];
        
            const data = await xlsx.utils.sheet_to_json(sheet);
        
            data.forEach(row => {
                delete row[Object.keys(row)[0]];
            });
        
            const dataProcessed = data.map(product => {
                const price = parseFloat(product.cost) * parseFloat(product.markdown) / 100
                return {
                code: product.code,
                category: product.category,
                subCategory: product.subCategory,
                title: product.title,
                description: product.description,
                brand: product.brand,
                provider: product.provider,
                cost: parseFloat(product.cost),
                markdown: parseFloat(product.markdown),
                price,
                thumbnail: product.thumbnail,
                stock: parseInt(product.stock),
                status: true
              }});
              
            await this.productService.addProducts(dataProcessed)
        
            const {io} = req
            io.emit('massiveProductsUpload', await this.productService.getProducts({},req.filter))
        
            await res.send({status: "success", payload: 'Archivo agregado exitosamente'})
        } catch (error) {
            logger.error(error.message)
        }
        
    }

}

export default UploadController