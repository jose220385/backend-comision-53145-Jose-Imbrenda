import { categoryService } from "../service/index.js"


class CategoriesController{
    constructor(){
        this.categoryService = categoryService
    }

    createCategory = async (req,res)=>{
        res.send(await this.categoryService.addCategory(req.body))
    }
    
    getCategories = async (req,res)=>{
        res.send(await this.categoryService.getCategories())
    }

    createSubCategory = async (req,res)=>{
        res.send(await this.categoryService.addSubCategory(req.body))
    }
    
    getSubCategoryByCategory = async (req,res)=>{
        const {catId} = req.params
        console.log("log del router"+catId);
        res.send(await this.categoryService.getSubCategories(catId))
    }
    
}

export default CategoriesController