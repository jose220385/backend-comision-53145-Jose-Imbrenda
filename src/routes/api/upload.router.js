import { Router } from "express";
import { uploader } from "../../utils/multer.js";
import UploadController from "../../controllers/upload.controller.js";

const router = new Router() 
const{uploadFile}= new UploadController()

router.post('/bdFile', uploader.single('bdFile'), uploadFile)

export default router