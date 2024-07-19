import { BrandsDao, CartsDao, CategoriesDao, MessagesDao, ProductsDao, TicketsDao, UsersDao } from "../dao/factory.js";
import ProductRepository from "../repository/product.repository.js";
import UserRepository from "../repository/user.repository.js";
import CartRepository from "../repository/cart.repository.js"
import BrandRepository from "../repository/brand.repository.js";
import MessageRepository from "../repository/message.repository.js";
import CategoryRepository from "../repository/category.repository.js";
import TicketRepository from "../repository/ticket.repository.js";



//Service de productos y derivados
export const productService = new ProductRepository (new ProductsDao) 
export const categoryService = new CategoryRepository( new CategoriesDao)
export const brandService = new BrandRepository(new BrandsDao)

//Service de Carts
export const cartService = new CartRepository(new CartsDao)

//Service de Users
export const userService = new UserRepository(new UsersDao) 

//Service de mensajes
export const messageService = new MessageRepository(new MessagesDao)

//Service de Tickets
export const ticketService = new TicketRepository(new TicketsDao)



