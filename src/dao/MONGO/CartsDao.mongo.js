import DaoMongo from './daoMongo.js';
import { cartModel } from './models/cart.model.js';

export default class CartsDaoMongo extends DaoMongo{
    constructor() {
      super(cartModel)
    }
        getProductsByCartId = async(id) =>{
          return await cartModel.findById(id).populate('products.productId').lean().exec()
        } 

        deleteProductFromCart = async(cid,pid) =>{
          return  await cartModel.findByIdAndUpdate(
              cid,
              { $pull: { products: { productId: pid } } },
              { new: true }
          )
        }

        deleteProducts = async(cid) =>{
          return await cartModel.findByIdAndUpdate(
              cid,
              {$set:{products:[]}},
              { new: true }
            )
        }
  
        }


      /* addCart = async()=>{
        try {
            const newCart = await cartModel.create({products: []})
            return ({status: "success", payload: newCart})
          } catch (error) {
            console.log(error);
          }
        }; */

     
        

     /*  getCarts = async ()=>{
        const carts = await cartModel.find().lean()
        return carts
      } */

      //findProductInCart = async (query) => {return await cartModel.findOne(query)}

    /*   addProductToCart = async (cid,quantity,pid) =>{
        try{
            const query = cartModel.where({ _id: cid, 'products.productId':pid })
            const productExist = await query.findOne()

            if(!productExist){
                const cart = await cartModel.findOneAndUpdate(
                { _id: cid},
                { $addToSet: { products: { productId: pid, quantity} } },
                { new: true,upsert: true  })
                return ({status: "success", payload: cart})
            }
            
            const addProduct = await cartModel.findOneAndUpdate(
              { _id: cid, 'products.productId':pid },
              { $inc: { 'products.$.quantity': quantity }}, 
              { new: true,upsert: true })
              return ({status: "success", payload: addProduct})
            
            
          } catch (error) {
            console.log(error);
          }
        } */

      /* addProductToCart = async (filter,quantity,pid) =>{
          const cart = await cartModel.findOneAndUpdate(
      }
 */
      

      

        // pruebas

       /*  const cartManager = new CartManager()

        const test = async () =>{
            //await cartManager.addCart()
            //await cartManager.addProductToCart("f7e57d21-c101-487f-b7f1-4473c9b148aa",2,"bfabfa40-8976-4d37-a737-1cb028e99163")
            const products = await cartManager.getProductsByCartId("f7e57d21-c101-487f-b7f1-4473c9b148aa")
            console.log(products)  
        }
        
        test()  */

