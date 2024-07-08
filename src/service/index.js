import MDBBrandManager from "../dao/MongoDB.BrandsManager.js";
import MDBCartManager from "../dao/MongoDB.CartManager.js";
import MDBCategoryManager from "../dao/MongoDB.CategoryManager.js";
import MDBMessageManager from "../dao/MongoDB.MessageManager.js";
import MDBProductManager from "../dao/MongoDB.ProductManager.js";
import MDBUserManager from "../dao/MongoDB.UserManager.js";

//Service de productos y derivados
export const productService = new MDBProductManager()
export const categoryService = new MDBCategoryManager()
export const brandService = new MDBBrandManager()

//Service de Carts
export const cartService = new MDBCartManager()

//Service de Users
export const userService = new MDBUserManager()

//Service de mensajes
export const messageService = new MDBMessageManager()



