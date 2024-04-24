//import fs from 'fs'
//import { v4 as uuidv4 } from 'uuid';
import { __dirname } from '../utils.js';
import { readFile, writeFile } from "../utils.js";
import { productModel } from '../models/product.model.js';
//import { isExist } from "../utils.js";

export default class ProductManager {
  constructor() {
    (this.path = `${__dirname}/products.json`)
  }

  addProduct = async (object) => {
    try {
      const query = productModel.where({code: object.code})
      const codeValidation = await query.findOne().lean()
    if (codeValidation) {
      console.log('Error');
      return {status:"Failed", payload: "El codigo corresponde a otro producto"}
    }

      const newProduct = await productModel.create({
        code: object.code,
        category: object.category,
        title: object.title,
        description: object.description,
        price: parseFloat(object.price),
        thumbnail: object.thumbnail,
        stock: parseInt(object.stock),
        status: true
      });

      return ({status: "success", payload: newProduct})

    } catch (error) {
      console.log(error);
    }
  };

  getProducts = async() => {
    const products = await productModel.find().lean()
    return products;
  }

  getProductById = async(id) =>{
    try{
    //const products = await readFile(this.path)
    //const productFound = products.find((product) => product.id === id);
    const productFound = await productModel.findById(id).lean()
    return productFound;
  } catch (error) {
    console.log(error);
  }
}

deleteProduct = async(id) =>{
try{
 /*  const products = await readFile(this.path)
  const indexToDelete = products.findIndex(p => p.id === id)
  if(indexToDelete < 0) return ({status:"failed", payload:"No se ha encontrado el producto que desea borrar"})
  products.splice(indexToDelete,1)
  await writeFile(products,this.path) */
  await productModel.findOneAndDelete(id)
  return({status:"success", payload: 'Producto Borrado Exitosamente'})
} catch (error) {
  console.log(error);
}
}

updateProduct = async(id,productToUpdate) =>{
  /* const products = await readFile(this.path)
  const indexToUpdate = products.findIndex(p => p.id === id)
  if(indexToUpdate < 0) return ({status:"failed", payload:"No se ha encontrado el producto que desea modificar"})
  this.codeValidation(productToUpdate,products)*/
  //console.log(productToUpdate);
  //const productToUpdate = JSON.parse(product)
  const productNotUpdated = await this.getProductById(id)
  const updatedProduct = {
      code: productToUpdate.code === ""? productNotUpdated.code : productToUpdate.code,
      title: productToUpdate.title === ""? productNotUpdated.title : productToUpdate.title,
      description: productToUpdate.description === ""? productNotUpdated.description : productToUpdate.description,
      price: productToUpdate.price === ""? productNotUpdated.price : productToUpdate.price,
      thumbnail: productToUpdate.thumbnail === ""? productNotUpdated.thumbnail : productToUpdate.thumbnail,
      stock: productToUpdate.stock === ""? productNotUpdated.stock : productToUpdate.stock,
      category: productToUpdate.category === ""? productNotUpdated.category : productToUpdate.category,
      status: true,
  }
  await productModel.findOneAndUpdate({_id:id}, updatedProduct, {new:true})
  return({status:"success", payload: updatedProduct})
}

}


