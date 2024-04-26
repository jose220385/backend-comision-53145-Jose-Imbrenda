import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import { connect } from './config/db.js'
import uploadRouter from './routes/upload.router.js'

const app = express()

const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, err =>{
    if(err) console.log(err)
    console.log('Server escuchando en el puerto 8080')
})

const io = new Server(httpServer)

function productsSocket(io){
    return((req,res,next)=>{
        req.io = io
        next()
    })
}

connect()

app.use(productsSocket(io))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/upload', uploadRouter)

app.use('/', viewRouter)

io.on('connection', socket =>{
    console.log('nuevo cliente conectado')
})
