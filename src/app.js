import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils/utils.js'
import { Server } from 'socket.io'
import { connect } from './config/db.js'
import uploadRouter from './routes/upload.router.js'
import {dirname} from "path"
import { messageModel } from './dao/models/message.model.js'

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

app.use(express.static(`${dirname(__dirname)}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${dirname(__dirname)}/views`)
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/upload', uploadRouter)

app.use('/', viewRouter)

/* async function saveMessage (data){
    await messageModel.create(data)
}

async function showMessages (){
    const messages = await messageModel.find().lean()
    return messages
} */



io.on('connection', socket =>{
    console.log('nuevo cliente conectado')
    socket.on('message', async data => {
       /*  newMessages.push(data)
        console.log(newMessages)  */
        await messageModel.create(data)
        /* console.log(data) 
        saveMessage(data) */
        // emitimos los mensajes
        socket.emit('messageLogs', await messageModel.find().lean())
    })
})




