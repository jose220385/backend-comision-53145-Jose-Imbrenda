import { Router } from "express";
import TicketController from "../../controllers/ticket.controller.js";


const router = new Router()
const{createTicket} = new TicketController()

router.post('/', createTicket)

export default router