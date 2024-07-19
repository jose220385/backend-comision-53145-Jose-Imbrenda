import DaoMongo from './daoMongo.js';
import { categoryModel } from './models/category.model.js';

export default class CategoriesDaoMongo extends DaoMongo{
    constructor() {
        super(categoryModel)
    }

     /*  addCategory = async(category) =>{
        const newCategory = await this.categoryModel.create({categoryName:category.categoryName, subCategories:[]})
        return newCategory
      } */
      
      /* addSubCategory = async(newSubCategory) =>{
        const subCategoryToAdd = await this.categoryModel.findOneAndUpdate(
          {categoryName:newSubCategory.categoryName},
          { $addToSet: { subCategories: {_id:uuidv4(),subCategoryName: newSubCategory.subCategoryName} } },
          { new: true, upsert: true }
          )
        return subCategoryToAdd
      } */
      
      /* getCategories = async() =>{
        const categories = await this.categoryModel.find().lean()
        return categories
      } */
      
      /* getSubCategories = async(category) =>{
          const categoryFound = await this.categoryModel.findOne({categoryName:category}).lean()
          return categoryFound.subCategories
      }
       */
}