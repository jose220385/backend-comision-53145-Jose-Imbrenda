import { cartService, productService } from "../service/index.js";


class CartsController {
    constructor(){
        this.cartService = cartService
        this.productService = productService
    }

    getProductsByCartId = async (req,res)=>{
        try {
            const {cid} = req.params
            const ProductsByCartId = await this.cartService.getProductsByCartId(cid)
            if(!ProductsByCartId){return res.status(404).send({status:'error', error: 'Carrito no encontrado'})}
            res.send({status: 'success', payload: ProductsByCartId})
        } catch (error) {
            console.log(error);
        }ß
           
    }

    getCarts = async (req,res)=>{
        try {
            const carts = await this.cartService.getCarts()
            res.send({status: 'success', payload: carts})
        } catch (error) {
            console.log(error);
        }
        
    }

    addCart = async (req,res)=>{
        try {
            await this.cartService.addCart()
            res.send({status: 'success', payload: 'Carrito creado satisfactoriamente'})
        } catch (error) {
            console.log(error);
        }
    }
       

    addProductToCart = async (req,res)=>{
        try {
            const {cid} = req.params
            const {pid} = req.params
            const{quantity}=req.body
            
            const query = {
                _id:cid,
                'products.productId':pid
            }
            const productExist = await this.cartService.findProductInCart(query)
            
            if(!productExist){
                const cart = await this.cartService.addProductToCart(
                { _id: cid},
                { $addToSet: { products: { productId: pid, quantity} } }
                )
                return ({status: "success", payload: cart})
            }
            
            const addProduct = await this.cartService.addProductToCart(
              { _id: cid, 'products.productId':pid },
              { $inc: { 'products.$.quantity': quantity }}
              )
              return ({status: "success", payload: addProduct})
            
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductFromCart = async (req,res)=>{
        try {
            const {cid} = req.params
            const {pid} = req.params
            const cart = await this.cartService.deleteProductFromCart(cid,pid)
            res.send({status: "success", payload: cart})
            const {io} = req
            io.emit('cartView-deleteProduct', await this.cartService.getProductsByCartId(cid))
        } catch (error) {
            console.log(error);
        }
    }
    
    deleteAllProductsFromCart = async(req,res) =>{
        try {
            const {cid} = req.params    
            const cart = await this.cartService.deleteProducts(cid)
            return res.send({status:"success", payload: cart})
        } catch (error) {
            console.log(error);
        }
    }  

    changeProductQuantity = async(req,res) =>{
        try {
            const {cid} = req.params
            const {pid} = req.params
            const quantity = parseInt(req.body.quantity)

            console.log(quantity);

            const productUpdated = await this.cartService.changeProductQuantity(
                { _id: cid, "products.productId": pid },
                { $set: { "products.$.quantity": quantity } }
            )
            res.send({status:"success", payload: productUpdated})
            /* const {io} = req
            io.emit('cartView-modifyQuantity', await this.cartService.getProductsByCartId(cid)) */
        } catch (error) {
            console.log(error);
        }
    }
    
    purchaseCart = async(req,res) =>{
        try {
            const {cid} = req.params 
            const {products} = await this.cartService.getProductsByCartId(cid)
            
            if(products.length === 0){return res.send("No hay productos en el carrito")}

            let productsWithStock = []
            let productsWithoutStock =[]

            for (const product of products) {
                const productInBD = await this.productService.getProductById(product.productId._id);

                if (productInBD.stock >= product.quantity) {
                    const newStock = productInBD.stock - product.quantity;
                    const updatedProduct = await this.productService.updateProduct(
                        { _id: product.productId._id },
                        { $set: { stock: newStock } }
                    );

                    product.productId = updatedProduct;
                    productsWithStock.push(product);
                } else {
                    productsWithoutStock.push(product);
                }
            }

            //console.log(productsWithStock);

            const totalValues = productsWithStock.map(product => {
            return (product.quantity * product.productId.price)
            });
            const totalPurchase = totalValues.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
            
            req.session.ticket = {
                totalPurchase,
                productsWithStock,
                productsWithoutStock
            }

            req.session.save((err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error al guardar la sesión");
                }
                res.send({ status: "success", payload: { totalPurchase, productsWithStock, productsWithoutStock } });
            });
            //res.send({status:"success", payload: {totalPurchase, productsWithStock, productsWithoutStock}})

        } catch (error) {
            console.log(error);
        }
        
    }
    

}

export default CartsController

