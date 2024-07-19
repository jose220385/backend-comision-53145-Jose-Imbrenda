import { cartService, ticketService } from "../service/index.js"
import { v4 as uuidv4 } from 'uuid';

class TicketController{
    constructor(){
        this.ticketService = ticketService
        this.cartService = cartService
    }

    createTicket = async(req,res) =>{
        try {
            if (!req.session.ticket) {
                return res.status(400).send("No hay ticket en la sesión");
            }
            const{totalPurchase,productsWithoutStock, productsWithStock} = req.session?.ticket
            const{email, cart} = req.session.user
            const currentDate = new Date()
    
            const newTicket = {
                code:uuidv4(),
                purchase_datetime: currentDate.toLocaleString(),
                amount: parseFloat(totalPurchase),
                items: productsWithStock,
                purchaser: email
            }
    
            const result = await this.ticketService.createTicket(newTicket)
    
            let cartResult 
    
            if(productsWithoutStock.length > 0){
                cartResult = await this.cartService.changeProductQuantity(
                    {_id:cart},
                    { $set: { products: productsWithoutStock } },
                )
            } else {
                cartResult = await this.cartService.deleteProducts(cart)
            }

            //delete req.session.ticket

           return res.send({status:"success", payload: {result, cartResult}})

            //return res.redirect('/products')
        } catch (error) {
            console.log(error);
        }
       



        
    }
}

export default TicketController