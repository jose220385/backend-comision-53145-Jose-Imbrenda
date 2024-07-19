import { connect } from '../config/db.js'
import { objectConfig } from "../dotenv.config.js"

export let BrandsDao
export let CartsDao
export let CategoriesDao
export let MessagesDao
export let ProductsDao
export let UsersDao
export let TicketsDao


switch (objectConfig.persistence) {
    case 'MEMORY':
        
        break;
    case 'FS':
        const {default: CartsDaoFs} = await import ("./FS/CartsDao.FS.js")
        CartsDao=CartsDaoFs
        const {default: ProductsDaoFs} = await import ("./FS/ProductsDao.FS.js")
        ProductsDao = ProductsDaoFs
        break;

    default:
        //MONGO
        connect()
        const {default: ProductsDaoMongo} = await import ("./MONGO/ProductsDao.mongo.js")
        ProductsDao = ProductsDaoMongo
        const {default: BrandsDaoMongo} = await import ("./MONGO/BrandsDao.mongo.js")
        BrandsDao = BrandsDaoMongo
        const {default: CartsDaoMongo} = await import ("./MONGO/CartsDao.mongo.js")
        CartsDao = CartsDaoMongo
        const {default: CategoriesDaoMongo} = await import ("./MONGO/CategoriesDao.mongo.js")
        CategoriesDao = CategoriesDaoMongo
        const {default: MessageDaoMongo} = await import ("./MONGO/MessagesDao.mongo.js")
        MessagesDao = MessageDaoMongo
        const {default: UsersDaoMongo} = await import ("./MONGO/UsersDao.mongo.js")
        UsersDao = UsersDaoMongo
        const{default: TicketsDaoMongo} = await import("./MONGO/TicketsDao.mongo.js")
        TicketsDao = TicketsDaoMongo
        break;
}