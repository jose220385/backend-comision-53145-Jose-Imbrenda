import express from 'express'
import routerApp from './routes/index.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils/utils.js'
import { Server } from 'socket.io'
import { Server as ServerHttp } from 'http'
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
import { handleErrors } from './middlewares/errors/index.js'
import { addLogger } from './middlewares/addLogger.middleware.js'
import logger from './utils/loggers.js'
import cors from 'cors'
import swaggerUiExpress from 'swagger-ui-express'


const app = express()

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, err =>{
    if(err) console.log(err)
    logger.info('Server escuchando en el puerto', PORT)
})

const io = new Server(httpServer)

function productsSocket(io){
    return((req,res,next)=>{
        req.io = io
        next()
    })
}


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors());

app.use(handleErrors())

app.use(productsSocket(io))

app.use(express.static(`${dirname(__dirname)}/public`))

app.use(cookieParser(PRIVATE_KEY))

app.use(addLogger)

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
    logger.info('nuevo cliente conectado')
    socket.on('message', async data => {
        await messageModel.create(data)
        socket.emit('messageLogs', await messageModel.find().lean())
    })
})

/* export const getServer = (port) => app.listen(port, err =>{
    if(err) console.log(err)
    logger.info('Server escuchando en el puerto', port)
}) */
//export const getServer =()=>httpServer

//Docker para subir archivo: 

//docker tag operation jose2203/operation:1.0.0
//docker push jose2203/operation:1.0.0



