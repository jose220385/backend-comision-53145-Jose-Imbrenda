import dotenv from 'dotenv'

dotenv.config()

export const objectConfig = {
    port: process.env.PORT,
    mongoPassword : process.env.MONGO_PASSWORD,
    adminMail: process.env.ADMIN_MAIL
}