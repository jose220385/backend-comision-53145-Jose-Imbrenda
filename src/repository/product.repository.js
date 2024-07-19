export default class ProductRepository{
    constructor(ProductsDao){
        this.productsDao = ProductsDao
    }

    addProduct = async (object) => {return await this.productsDao.create(object)};
    
    addProducts = async (products) =>{return await this.productsDao.createMany(products)}

    getProductById = async (id) =>{return await this.productsDao.getById(id)}

    getProductBy = async(filter) =>{return await this.productsDao.getBy(filter)}

    deleteProductById = async(id) => {return await this.productsDao.deleteById(id)}

    updateProduct = async(id, productToUpdate) => {return await this.productsDao.update(id, productToUpdate)}
    
    getProducts = async({limit = 10, newPage = 1},filter ={}) => {
        const query = {}
        if(filter.category){query.category = filter.category}
        if(filter.subCategory){query.subCategory = filter.subCategory}
        if(filter.brand){query.brand = filter.brand}
        if(filter.status){
          filter.status === "withoutStock"? query.status = false : query.status = true
        } 
    
        let products
        let conditions
        
        if(filter.order){
            const sortOption = filter.order === "high"? -1:1
            conditions = {limit,page: newPage,lean:true, sort:{price:sortOption}}
            products = await this.productsDao.getAllWithPaginate(query, conditions)
            return products;
          }
        conditions ={limit,page: newPage,lean:true}
        products = await this.productsDao.getAllWithPaginate(query, conditions)
        return products;
        
    }
    
    /*  getProductById = async(id) =>{
        try{
        const productFound = await productModel.findById(id).lean()
        console.log(productFound);
        return productFound;
      } catch (error) {
        console.log(error);
      }
    } */
     
    
    /* deleteProduct = async(id) =>{
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
    */
   
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
    