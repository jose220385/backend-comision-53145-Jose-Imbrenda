class SubCategoriesController{
    constructor(){}

    createSubCategory = async (req,res)=>{
        res.send(await mdbProductManager.addSubCategory(req.body))
    }
    
    getSubCategoryByCategory = async (req,res)=>{
        const {catId} = req.params
        console.log("log del router"+catId);
        res.send(await mdbProductManager.getSubCategories(catId))
    }
    
}

export default SubCategoriesController