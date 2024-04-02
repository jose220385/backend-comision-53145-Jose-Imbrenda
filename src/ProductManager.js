import fs from 'fs'

export default class ProductManager {
  constructor() {
    (this.path = "./products.json")

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
        JSON.stringify(file, 'null', ),
        "utf-8")
  } catch (err){
    console.log(err)
  }
  }

  codeValidation=(objeto, products)=>{
    const codeValidation = products.some(
      (product) => objeto.code === product.code
    );
    if (codeValidation) {
      throw new Error("El codigo corresponde a otro producto");
    }
  }

  addProduct = async (objeto) => {
    try {
      if (!objeto.code || !objeto.title || !objeto.description || !objeto.price || !objeto.thumbnail || !objeto.stock) {
        throw new Error("Todos los campos son obligatorios");
    }

      const products = await this.readFile()

      this.codeValidation(objeto,products)

      const newProduct = {
        id: products.length +1,
        code: objeto.code,
        title: objeto.title,
        description: objeto.description,
        price: parseFloat(objeto.price),
        thumbnail: objeto.thumbnail,
        stock: parseInt(objeto.stock),
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
    const products = this.readFile()
    const productFound = products.find((product) => product.id === id);
    if(!productFound){
      throw new Error `El ${id} no corresponde a ningun producto en existencia`
    };
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
    throw new Error `El ${id} no corresponde a ningun producto en existencia`
  }

  this.codeValidation(productToUpdate,products)

  products[indexToUpdate] = {id:products[indexToUpdate].id, ...productToUpdate}

  await this.writeFile(products)
}

}


// Pruebas:

/* const productManager = new ProductManager();

const objeto = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "”Sin imagen”",
  code: "abc123",
  stock: 25,
}

const objeto2 = {
  title: "producto prueba 2",
  description: "Este es un producto prueba",
  price: 300,
  thumbnail: "”Sin imagen”",
  code: "abc124",
  stock: 25,
}

const objeto3 = {
  title: "producto prueba 3",
  description: "Este es un producto prueba",
  price: 300,
  thumbnail: "”Sin imagen”",
  code: "abc125",
  stock: 25,
} */

/* const test = async() =>{
  try{
    await productManager.addProduct(objeto)
    await productManager.addProduct(objeto2)
    await productManager.addProduct(objeto3)
  } catch (err){
    console.log(err)
  }
}

test() */

//productManager.deleteProduct(3)

//productManager.updateProduct(2,objeto3)