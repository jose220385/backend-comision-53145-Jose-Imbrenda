import swaggerJSDoc from "swagger-jsdoc"
import { __dirname } from "./utils.js"
import { dirname } from "path";

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title: 'Documentacion de API para Papelera San Gerardo',
            description: 'API para documentar app de compra y venta de productos descartables'
        }
    },
    apis:[`${dirname(__dirname)}/docs/**/*.yaml`]
}

export const swaggerSpecs = swaggerJSDoc(swaggerOptions)