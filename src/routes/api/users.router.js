import { Router } from "express";
import UsersController from "../../controllers/users.controller.js";
import { handleErrors } from "../../middlewares/errors/index.js";

const router = new Router()
const{createUser,getUserBy} = new UsersController()

router.get('/:filter', getUserBy)

router.post('/', handleErrors(), createUser)

export default router