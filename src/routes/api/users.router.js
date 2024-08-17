import { Router } from "express";
import UsersController from "../../controllers/users.controller.js";
import { handleErrors } from "../../middlewares/errors/index.js";

const router = new Router()
const{createUser,getUser,changePassword,changeToUserPremium} = new UsersController()

router.get('/:filter', getUser)

router.post('/', handleErrors(), createUser)

router.post('/changePassword/:token', changePassword)

router.get('/premium/:email', changeToUserPremium)

export default router