import express from 'express'
import routerApp from './routes/index.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils/utils.js'
import { Server } from 'socket.io'

//import uploadRouter from './routes/upload.router.js'
import {dirname} from "path"
import { messageModel } from './dao/MONGO/models/message.model.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initPassport } from './config/passport.config.js'
import { PRIVATE_KEY } from './utils/jsonwebtoken.js'
import { objectConfig } from './dotenv.config.js'

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



app.use(productsSocket(io))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(`${dirname(__dirname)}/public`))

app.use(cookieParser(PRIVATE_KEY))
/* app.use(session({
    secret:"secretCoder",
    resave: true,
    saveUninitialized: true
}))  */

objectConfig.mongoURL
app.use(session({
    store: MongoStore.create({
        mongoUrl: objectConfig.mongoURL,
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
initPassport() // llamamos a los midddlewares creados
app.use(passport.initialize()) // inicializa passport con los middlewares que creamos
app.use(passport.session()) //entrelaza passport con session

app.engine('handlebars', handlebars.engine())
app.set('views', `${dirname(__dirname)}/views`)
app.set('view engine', 'handlebars')

app.use(routerApp)

io.on('connection', socket =>{
    console.log('nuevo cliente conectado')
    socket.on('message', async data => {
        await messageModel.create(data)
        socket.emit('messageLogs', await messageModel.find().lean())
    })
})




