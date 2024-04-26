import { Router } from "express";
import { uploader } from "../utils/multer.js";
import { __dirname } from "../utils.js";
import xlsx from "xlsx"
import { productModel } from "../models/product.model.js";


const router = new Router() 

router.post('/bdFile', uploader.single('bdFile'), async (req,res)=>{
    if(!req.file){
        await res.send ({status:"Failed", payload: "El codigo corresponde a otro producto"})
    }
    const filePath = `${__dirname}/public/uploads/${req.file.filename}`

    const excelFile = await xlsx.readFile(filePath)

    const sheetName = excelFile.SheetNames[0];
    const sheet = excelFile.Sheets[sheetName];

    const data = await xlsx.utils.sheet_to_json(sheet);

    data.forEach(row => {
        delete row[Object.keys(row)[0]];
    });

    console.log(data);

    productModel.insertMany(data)

    const {io} = req
    io.emit('massiveProductsUpload', await productManager.getProducts())

    /* const bd = jsonData.map(e =>{
        return(
            e.code,
            e.title,
            e.category,
            e.brand,
            e.provider,
            e.price,
            e.stock,
            e.thumbnail,
            e.status
        )
    }

    )

    console.log(bd); */

    await res.send({status: "success", payload: 'Archivo agregado exitosamente'})
})

export default router