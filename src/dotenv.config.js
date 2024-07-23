import dotenv from 'dotenv'
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(__dirname);

const envFilePath = `${__dirname}/.env`

dotenv.config({path:envFilePath})

export const objectConfig = {
    port: process.env.PORT,
    mongoPassword : process.env.MONGO_PASSWORD,
    adminMail: process.env.ADMIN_MAIL,
    mongoURL: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE
}

//console.log(process.env.ADMIN_MAIL);

//node src/dotenv.config.js