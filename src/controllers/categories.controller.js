import { categoryService } from "../service/index.js"
import {v4 as uuidv4} from 'uuid'

class CategoriesController{
    constructor(){
        this.categoryService = categoryService
    }

    createCategory = async (req,res)=>{
        try {
            const newCategory = await this.categoryService.addCategory(req.body)
            return res.send({status:'success', payload: newCategory})
        } catch (error) {
            console.log(error);
        }
        
    }
    
    getCategories = async (req,res)=>{
        try {
            const categories = await this.categoryService.getCategories()
            return res.send({status:'success', payload: categories})
        } catch (error) {
            console.log(error);
        }
    }

    createSubCategory = async (req,res)=>{
        try {
            const newSubCategory = req.body
            const result = await this.categoryService.addSubCategory(
                {categoryName:newSubCategory.categoryName},
                { $addToSet: { subCategories: {_id:uuidv4(),subCategoryName: newSubCategory.subCategoryName} } }
            )
            return res.send({status:'success', payload: result})
        } catch (error) {
            console.log(error);
        }
    }
    
    getSubCategoryByCategory = async (req,res)=>{
        try {
            const {catId} = req.params
            //console.log("log del router"+catId);
            const categoryFound = await this.categoryService.getSubCategories({categoryName:catId})
            return res.send({status:'success', payload: categoryFound.subCategories})
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default CategoriesController