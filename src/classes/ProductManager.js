import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { __dirname } from '../utils.js';
import { readFile, writeFile } from "../utils.js";

export default class ProductManager {
  constructor() {
    (this.path = `${__dirname}/products.json`)

  }

  codeValidation=(object, products)=>{
    const codeValidation = products.some(
      (product) => object.code === product.code
    );
    if (codeValidation) {
      throw new Error("El codigo corresponde a otro producto");
    }
  }

  addProduct = async (object) => {
    try {

      const products = await readFile(this.path)

      this.codeValidation(object,products)

      const newProduct = {
        id: uuidv4(),
        code: object.code,
        category: object.category,
        title: object.title,
        description: object.description,
        price: parseFloat(object.price),
        thumbnail: object.thumbnail,
        stock: parseInt(object.stock),
        status: true
      };
      await products.push(newProduct);

      await writeFile(products,this.path)

    } catch (error) {
      console.log(error);
    }
  };

  getProducts = async() => {
    const products = await readFile(this.path)
    return products;
  }

  getProductById = async(id) =>{
    try{
    const products = await readFile(this.path)
    const productFound = products.find((product) => product.id === id);
    return productFound;
  } catch (error) {
    console.log(error);
  }
}

deleteProduct = async(id) =>{
try{
  const products = await readFile(this.path)
  const indexToDelete = products.findIndex(p => p.id === id)
  
  products.splice(indexToDelete,1)

  await writeFile(products,this.path)

} catch (error) {
  console.log(error);
}
}

updateProduct = async(id,productToUpdate) =>{
  const products = await readFile(this.path)
  const indexToUpdate = products.findIndex(p => p.id === id)
  this.codeValidation(productToUpdate,products)
  products[indexToUpdate] = {...products[indexToUpdate], ...productToUpdate, id}
  await writeFile(products,this.path)
}

}



//Test de funcion

//node --watch ./src/classes/ProductManager.js

/* const productManager = new ProductManager();


 const test = async() =>{
    console.log(await productManager.getProducts())
    console.log('------------------------')
    const productoEncontrado = await productManager.getProductById("61fc0d81-320e-4e10-af5e-e4add37555d7")
    console.log(productoEncontrado) 
}

test()  */



//Agrego los 10 productos:

/* const productsUpLoad = async() =>{
  try{
    let code = 111
    for (let i = 0; i<10; i++){
        await productManager.addProduct({
            title: "producto prueba " + (i+1),
            category: "categoria 1",
            description: "Este es un producto prueba",
            price: 300,
            thumbnail: "Sin imagen",
            code: code,
            stock: 25,
        })
        code ++
    }
  } catch (err){
    console.log(err)
  }
} 

productsUpLoad() */


//productManager.deleteProduct("66a2fa0f-a759-43ab-9d68-2e5cfc0e2e92")

//productManager.updateProduct("0e2eb4a9-e2bb-428e-96ea-6e9c59ff995d",object3)