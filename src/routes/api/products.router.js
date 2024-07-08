import { Router } from "express";
import ProductsController from "../../controllers/products.controller.js";
import CategoriesController from "../../controllers/categories.controller.js";
import BrandsController from "../../controllers/brands.controller.js";

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    changePrice
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

const router = new Router() 

router.get('/', getProducts)

router.get('/:pid', getProduct)

router.post('/', createProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct)

router.put('/changePrice', changePrice)

//CRUD Categorias:

router.post('/categories', createCategory)

router.get('/categories/all', getCategories)

router.post('/subCategories', createSubCategory)

router.get('/subCategories/:catId', getSubCategoryByCategory)

//CRUD de marcas

router.post('/brands', createBrand)

router.get('/brands/all', getBrands)


export default router