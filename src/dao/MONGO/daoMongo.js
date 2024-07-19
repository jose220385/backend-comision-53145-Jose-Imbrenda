export default class DaoMongo {
    constructor(model){
        this.model = model
    }

    test = async() => {return await this.model.find().lean()}
    getBy = async(filter)=> {return await this.model.findOne(filter).lean()}
    create = async(object)=> {return await this.model.create(object)}
    createMany = async(objectsArray) => {return await this.model.insertMany(objectsArray)}
    getAll = async() => {return await this.model.find().lean()}
    //getAllPagination = async ({limit = 10, newPage = 1},filter ={}) =>{return await this.model.paginate(query,{limit,page: newPage,lean:true, sort:{price:sortOption}})}
    getById = async(id) =>{return await this.model.findById(id).lean()}
    update = async(filter,objectToUpdate) => {return await this.model.findOneAndUpdate(filter, objectToUpdate, {new:true, upsert: true}).lean()}
    deleteById = async(id) => {return await this.model.findByIdAndDelete(id)}

    getAllWithPaginate = async (query,conditions) =>{
        return await this.model.paginate(query,conditions)
      }
    
    /* getAllWithPaginateSort = async ({limit = 10, newPage = 1},query, sortOption) =>{
        return await this.model.paginate(query,{limit,page: newPage,lean:true, sort:{price:sortOption}})
      } */

}