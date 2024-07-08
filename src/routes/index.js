import { Router } from "express"

import productsRouter from './api/products.router.js'
import cartsRouter from './api/carts.router.js'
import viewRouter from './views.router.js'
import sessionsRouter from './api/sessions.router.js'
import uploadRouter from './api/upload.router.js'

const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/upload', uploadRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/', viewRouter)

export default router