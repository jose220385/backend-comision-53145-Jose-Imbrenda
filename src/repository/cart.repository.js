export default class CartRepository{
    constructor(CartsDao){
        this.cartsDao = CartsDao
    }

    addCart = async()=>{return await this.cartsDao.create({products: []})}

    getProductsByCartId = async(id) =>{return await this.cartsDao.getProductsByCartId(id)}

    findProductInCart = async(query) =>{return await this.cartsDao.getBy(query)}

    getCarts = async()=>{return await this.cartsDao.getAll()}

    addProductToCart = async (filter,objectToUpdate) =>{return await this.cartsDao.update(filter,objectToUpdate)}

    deleteProductFromCart = async(cid,pid) =>{ return await this.cartsDao.deleteProductFromCart(cid,pid)}

    deleteProducts = async(cid) =>{return await this.cartsDao.deleteProducts(cid)}

    changeProductQuantity = async(filter,objectToUpdate) => {return await this.cartsDao.update(filter,objectToUpdate)}
    
}