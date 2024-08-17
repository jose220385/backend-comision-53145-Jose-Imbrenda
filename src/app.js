import cluster from 'node:cluster'
import{cpus} from 'node:os'
import logger from './utils/loggers.js'
import { get } from 'node:http'
import { getServer } from './server.js'
//import { Server as ServerIO } from 'socket.io'


const numeroDeProcesadores = cpus().length
const PORT = process.env.PORT || 8080

logger.info(`Numeros de hilos: ${numeroDeProcesadores}`)
logger.info(`port:${PORT}`)

if(cluster.isPrimary){
    logger.info('Proceso primario generando un proceso hijo')
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork()
    }
    /* cluster.on('message', worker =>{
        logger.info(`worker ${worker.process.pid} recibio un mensaje`)
    }) */
    cluster.on('exit', (worker, code, signal) => {
        logger.warn(`Worker ${worker.process.pid} ha terminado con código ${code} y señal ${signal}`)
        cluster.fork() // Reemplazar el worker terminado
    })
    
} else{
    logger.info('Al ser un proceso forkeado, no cuento como primario, por lo que isPrimary is false, soy un worker')
    logger.info(`soy un proceso hijo con el id: ${process.pid}`)
    getServer(PORT)
 
    
}