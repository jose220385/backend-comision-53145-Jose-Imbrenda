import { productModel } from './models/product.model.js';

export default class MDBProductManager {
  constructor() {
  }

  calculatePrice = (cost,markdown) =>{
    const retailPrice = cost + ((cost * markdown) / 100)
    return retailPrice
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
        subCategory: object.subCategory,
        title: object.title,
        description: object.description,
        brand: object.brand,
        provider: object.provider,
        cost: object.cost,
        markdown: object.markdown,
        price: this.calculatePrice(object.cost,object.markdown),
        thumbnail: object.thumbnail,
        stock: parseInt(object.stock),
        status: true
      });

      return ({status: "success", payload: newProduct})

    } catch (error) {
      console.log(error);
    }
  };

  addProducts = async (products) =>{
    try{
          const dataProcessed = products.map(product => {
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
          price: this.calculatePrice(product.cost,product.markdown),
          thumbnail: product.thumbnail,
          stock: parseInt(product.stock),
          status: true
        }});
        await productModel.insertMany(dataProcessed)
      } catch (error) {
      console.log(error);
    }
  }

  getProducts = async({limit = 10, newPage = 1},filter ={}) => {
    //const {category, subCategory, brand, order, status} = filter
    const query = {}
    if(filter.category){query.category = filter.category}
    if(filter.subCategory){query.subCategory = filter.subCategory}
    if(filter.brand){query.brand = filter.brand}
    if(filter.status){
      filter.status === "withoutStock"? query.status = false : query.status = true
    } 

    let products
    if(filter.order){
        const sortOption = filter.order === "high"? -1:1
        products = await productModel.paginate(query,{limit,page: newPage,lean:true, sort:{price:sortOption}})
        return products;
      }
    
    products = await productModel.paginate(query,{limit,page: newPage,lean:true})
    
    return products;
  }

 getProductById = async(id) =>{
    try{
    const productFound = await productModel.findById(id).lean()
    console.log(productFound);
    return productFound;
  } catch (error) {
    console.log(error);
  }
}
 

deleteProduct = async(id) =>{
try{
  await productModel.findByIdAndDelete(id)
  return({status:"success", payload: 'Producto Borrado Exitosamente'})
} catch (error) {
  console.log(error);
}
}

updateProduct = async(id,productToUpdate) =>{
  const productNotUpdated = await productModel.findById(id).lean()
  const updatedProduct = {
      code: productToUpdate.code === ""? productNotUpdated.code : productToUpdate.code,
      title: productToUpdate.title === ""? productNotUpdated.title : productToUpdate.title,
      description: productToUpdate.description === ""? productNotUpdated.description : productToUpdate.description,
      cost: productToUpdate.cost === ""? productNotUpdated.cost : productToUpdate.cost,
      markdown: productToUpdate.markdown === ""? productNotUpdated.markdown : productToUpdate.markdown,
      price: this.calculatePrice(productToUpdate.cost === ""? productNotUpdated.cost : productToUpdate.cost,productToUpdate.markdown === ""? productNotUpdated.markdown : productToUpdate.markdown,),
      thumbnail: productToUpdate.thumbnail === ""? productNotUpdated.thumbnail : productToUpdate.thumbnail,
      stock: productToUpdate.stock === ""? productNotUpdated.stock : productToUpdate.stock,
      category: productToUpdate.category === ""? productNotUpdated.category : productToUpdate.category,
      subCategory: productToUpdate.subCategory === ""? productNotUpdated.subCategory : productToUpdate.subCategory,
      status: true,
  }
  await productModel.findOneAndUpdate({_id:id}, updatedProduct, {new:true})
  return({status:"success", payload: updatedProduct})
}

changePrice = async(filter)=>{
    const {changeCondition, category, subCategory, brand, percentaje} = filter
    try {
    const query = {}
    if(category){query.category = category}
    if(subCategory){query.subCategory = subCategory}
    if(brand){query.brand = brand}

    const products = await productModel.find(query)

  
  } catch (error) {
    console.log(error);
  }

}

}



