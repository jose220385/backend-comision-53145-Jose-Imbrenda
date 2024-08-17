import  jwt  from "jsonwebtoken"
import { sendMail } from "../utils/sendMail.js"
import { objectConfig } from "../dotenv.config.js"
import { userService } from "../service/index.js";
import logger from "../utils/loggers.js";

class MailsController{
    constructor(){
        this.userService = userService
    }

    sendPasswordRecoveryMail = async (req,res)=>{
        try {
            
            const { email } = req.body;
            const user = await this.userService.getUserBy({email});

            if (!user) {
                return res.status(400).send({status:"error" , payload: 'No se encontró el usuario con ese correo electrónico.'});
            }

            const JWT_SECRET = objectConfig.jwtSecret
            logger.info(JWT_SECRET);
            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            sendMail({
                usermail:'jsimbrenda@gmail.com',
                subject:'Mail de recuperacion de contraseña',
                html:`
                <div>
                    <h1>Podra cambiar su contraseña accediendo al siguiente link:</h1>
                    <a>http://localhost:${objectConfig.port}/reset-password/${token}</a>
                </div>
                `
            })
            return res.send({status:"success",payload: 'Mail de recuperacion enviado Enviado'})
        } catch (error) {
            logger.error(error.message)
        }
        
        }



    }
    
    
    


export default MailsController