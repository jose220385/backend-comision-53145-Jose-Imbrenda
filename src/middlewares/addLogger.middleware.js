import  logger  from "../utils/loggers.js"

export const addLogger = (req,res,next) =>{
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}