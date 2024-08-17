import nodemailer from 'nodemailer'
import { objectConfig } from '../dotenv.config.js'

const transport = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user: objectConfig.nodemailerMail,
        pass: objectConfig.nodemailerPassword
    }
})

export const sendMail = async ({usermail,subject,html}) =>{
    return await transport.sendMail({
        from: 'Papelera San Gerardo <jsimbrenda@gmail.com>',
        to: usermail,
        subject,
        html
    })
}