export default class CategoryRepository{
    constructor(CategoriesDao){
        this.categoriesDao = CategoriesDao
    }

    addCategory = async(category) =>{return await this.categoriesDao.create(category)}

    getCategories = async() =>{return await this.categoriesDao.getAll()}

    getSubCategories = async(category) =>{return await this.categoriesDao.getBy(category)}
    
    addSubCategory = async(filter,newSubCategory) =>{return await this.categoriesDao.update(filter,newSubCategory)}
    

}