import { brandService } from "../service/index.js"

class BrandsController{
    constructor(){
        this.brandService = brandService
    }

    createBrand = async (req,res)=>{
        res.send(await this.brandService.addBrand(req.body))
    }
    
    getBrands = async (req,res)=>{
        res.send(await this.brandService.getBrands())
    }
    
}

export default BrandsController