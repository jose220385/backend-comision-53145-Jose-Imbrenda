export default class BrandRepository {
    constructor(BrandsDao){
        this.brandsDao = BrandsDao
    }

    addBrand= async(brand) =>{return await this.brandsDao.create(brand)}

    getBrands = async() =>{return await this.brandsDao.getAll()}
}