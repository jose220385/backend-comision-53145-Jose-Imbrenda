import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils/utils.js'
import { Server } from 'socket.io'
import { connect } from './config/db.js'
import uploadRouter from './routes/upload.router.js'
import {dirname} from "path"
import { messageModel } from './dao/models/message.model.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initPassport } from './config/passport.config.js'

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

app.use(cookieParser('secretFirm'))
/* app.use(session({
    secret:"secretCoder",
    resave: true,
    saveUninitialized: true
})) */
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://jsimbrenda:4F4ZJdNwWpQy9kl1@papelerasangerardo.wphphau.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=papeleraSanGerardo`,
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl:60*60*1000*24
    }),
    secret:"secretCoder",
    resave: true,
    saveUninitialized: true
    
}))
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', `${dirname(__dirname)}/views`)
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/sessions', sessionsRouter)

app.use('/', viewRouter)

io.on('connection', socket =>{
    console.log('nuevo cliente conectado')
    socket.on('message', async data => {
        await messageModel.create(data)
        socket.emit('messageLogs', await messageModel.find().lean())
    })
})




