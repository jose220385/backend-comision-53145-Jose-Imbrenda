import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { __dirname } from '../utils.js';

export default class ProductManager {
  constructor() {
    (this.path = `${__dirname}/products.json`)

  }

  readFile = async()=>{
    try{
    const file = await fs.promises.readFile(this.path, 'utf-8')
    return JSON.parse(file)
  } catch {
    return []
  }
  }

  writeFile = async(file)=>{
    try{
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(file, 'null',2),
        "utf-8")
  } catch (err){
    console.log(err)
  }
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

      const products = await this.readFile()

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

      await this.writeFile(products)

    } catch (error) {
      console.log(error);
    }
  };

  getProducts = async() => {
    const products = await this.readFile()
    return products;
  }

  getProductById = async(id) =>{
    try{
    const products = await this.readFile()
    const productFound = products.find((product) => product.id === id);
    return productFound;
  } catch (error) {
    console.log(error);
  }
}

deleteProduct = async(id) =>{
try{
  const products = await this.readFile()
  const indexToDelete = products.findIndex(p => p.id === id)
  
  if(indexToDelete<0){
    throw new Error `El ${id} no corresponde a ningun producto en existencia`
  }

  products.splice(indexToDelete,1)

  await this.writeFile(products)

} catch (error) {
  console.log(error);
}
}

updateProduct = async(id,productToUpdate) =>{
  const products = await this.readFile()
  const indexToUpdate = products.findIndex(p => p.id === id)
  
  if(indexToUpdate<0){
    //throw new Error `El ${id} no corresponde a ningun producto en existencia`
    return res.status(404).send({status: 'error', error:`El ${id} no corresponde a ningun producto en existencia`})
  }

  this.codeValidation(productToUpdate,products)

  products[indexToUpdate] = {...products[indexToUpdate], ...productToUpdate, id}

  await this.writeFile(products)
}

}



//Test de funcion

//node --watch ./src/classes/ProductManager.js

//const productManager = new ProductManager();


 /* const test = async() =>{
    console.log(await productManager.getProducts())
    const productoEncontrado = await productManager.getProductById("62bdec17-c4e8-4ee1-9209-df230a33d93e")
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