import winston from "winston";
import program from "./commander.js";

const customLevelOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http: 4,
        debug: 5
    },
    colors:{
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info:'blue',
        http:'green',
        debug: 'white'
    }
}

const {mode} = program.opts()

let logger

switch (mode) {
    case 'production':
        logger = winston.createLogger({
            levels: customLevelOptions.levels,
            transports:[
                new winston.transports.Console({
                    level:"info",
                    format: winston.format.combine(
                        winston.format.colorize({colors: customLevelOptions.colors}),
                        winston.format.simple()
                    )        
                }),
                new winston.transports.File({
                    filename:"./errors.log",
                    level: "error",
                    format: winston.format.simple()
                })
            ]
        })
        break;
        case 'development':
        logger = winston.createLogger({
            levels: customLevelOptions.levels,
            transports:[
                new winston.transports.Console({
                    level:"debug",
                    format: winston.format.combine(
                        winston.format.colorize({colors: customLevelOptions.colors}),
                        winston.format.simple()
                    )        
                })
                /* new winston.transports.File({
                    filename:"./errors.log",
                    level: "warning",
                    format: winston.format.simple()
                }) */
            ]
        })
        break;
    default:
        logger = winston.createLogger({
            levels: customLevelOptions.levels,
            transports:[
                new winston.transports.Console({
                    level:"info",
                    format: winston.format.combine(
                        winston.format.colorize({colors: customLevelOptions.colors}),
                        winston.format.simple()
                    )        
                }),
                new winston.transports.File({
                    filename:"./errors.log",
                    level: "warning",
                    format: winston.format.simple()
                })
            ]
        })
        break;
}


export default logger