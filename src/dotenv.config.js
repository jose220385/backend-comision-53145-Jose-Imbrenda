import dotenv from 'dotenv'
import { fileURLToPath } from "url";
import { dirname } from "path";
import  program  from './utils/commander.js';



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(__dirname);

const envFilePath = `${__dirname}/.env`
const envProductionPath = `${__dirname}/.env.production`
const envDevelopmentPath = `${__dirname}/.env.development`

const {mode} = program.opts()

console.log(mode);

dotenv.config({path:mode === 'production'? envProductionPath:envDevelopmentPath})

export const objectConfig = {
    port: process.env.PORT || 8080,
    mongoPassword : process.env.MONGO_PASSWORD,
    adminMail: process.env.ADMIN_MAIL,
    mongoURL: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE
}

// Para produccion configurar la variable NODE_ENV=production para hacer mas performante el codigo

//console.log(process.env.ADMIN_MAIL);

//node src/dotenv.config.js