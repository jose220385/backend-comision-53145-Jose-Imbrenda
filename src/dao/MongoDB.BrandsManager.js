import{brandModel} from './models/brand.model.js'

export default class MDBBrandManager {
    constructor() {}

      addBrand= async(brand) =>{
        const newBrand = await brandModel.create({brandName:brand.brandName})
        return ({status:"success", payload: newBrand})
      }
      
      getBrands = async() =>{
        const brands = await brandModel.find().lean()
        return brands
      }
}

