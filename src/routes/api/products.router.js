import { Router } from "express";
import ProductsController from "../../controllers/products.controller.js";
import CategoriesController from "../../controllers/categories.controller.js";
import BrandsController from "../../controllers/brands.controller.js";
import { handleErrors } from "../../middlewares/errors/index.js";

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    changePrice,
    testProduct
} = new ProductsController()

const {
    createCategory,
    getCategories,
    createSubCategory,
    getSubCategoryByCategory
}= new CategoriesController()

const{
    createBrand,
    getBrands
}= new BrandsController()

// CRUD PRODUCTOS

const router = new Router() 

router.get('/', getProducts)

router.get('/:pid', getProduct)

router.post('/', handleErrors(), createProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct)

router.put('/changePrice', changePrice)

router.get('/test/test', testProduct)

//CRUD Categorias:

router.post('/categories', createCategory)

router.get('/categories/all', getCategories)

router.post('/subCategories', createSubCategory)

router.get('/subCategories/:catId', getSubCategoryByCategory)

//CRUD de marcas

router.post('/brands', createBrand)

router.get('/brands/all', getBrands)


export default router