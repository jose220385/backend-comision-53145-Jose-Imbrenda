import { Router } from "express";
import UsersController from "../../controllers/users.controller.js";

const router = new Router()
const{createUser,getUserBy} = new UsersController()

router.get('/:filter', getUserBy)

router.post('/', createUser)

export default router