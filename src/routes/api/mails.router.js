import { Router } from "express";
import MailsController from "../../controllers/mails.controler.js";

const router = new Router()
const{sendPasswordRecoveryMail} = new MailsController()

router.post('/sendPasswordRecoveryMail', sendPasswordRecoveryMail)

export default router