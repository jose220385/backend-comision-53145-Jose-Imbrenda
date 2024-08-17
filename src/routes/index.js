import { Router } from "express"
import swaggerUiExpress from 'swagger-ui-express'

import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import viewRouter from './views.router.js'
import sessionsRouter from './api/sessions.router.js'
import uploadRouter from './api/upload.router.js'
import ticketRouter from './api/ticket.router.js'
import usersRouter from './api/users.router.js'
import mailsRouter from './api/mails.router.js'
import { swaggerSpecs } from "../utils/swagger.js"

const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/upload', uploadRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/tickets', ticketRouter)
router.use('/api/users', usersRouter)
router.use('/api/mails', mailsRouter)
router.use('/', viewRouter)
router.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))

export default router