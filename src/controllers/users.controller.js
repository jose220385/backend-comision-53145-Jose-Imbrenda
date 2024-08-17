import { userService } from "../service/index.js";
import { CustomError } from "../service/errors/CustomError.js";
import { EError } from "../service/errors/enums.js";
import { generateUserError } from "../service/errors/info.js";
import { cartService } from "../service/index.js";
import logger from "../utils/loggers.js";
import { objectConfig } from "../dotenv.config.js";
import  jwt  from "jsonwebtoken"
import { createHash } from "../utils/bcrypt.js";

class UsersController {
    constructor(){
        this.userService = userService
        this.cartService = cartService
    }

    createUser = async (req,res,next)=>{
        try {
            if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.age){
                //return res.status(404).send('Falta completar campos')
                CustomError.createError({
                    name: 'Error al crear un Usuario',
                    cause: generateUserError({
                        first_name : req.body.first_name, 
                        last_name : req.body.last_name, 
                        email: req.body.email, 
                        password: req.body.password, 
                        age:req.body.age }),
                        code: EError.INVALID_TYPES_ERROR
                })
            }
            const{first_name, last_name, age, email, password} = req.body
            const userFound = await this.userService.getUserBy({email})
            
            //console.log('username:' + username);
            
            if(userFound){
                console.log('El usuario ya existe');
                return res.status(404).send('El usuario ya existe')
            }

            const {payload} = await this.cartService.addCart()

            console.log('newcart:' + payload);

            const newUser ={
                first_name,
                last_name,
                age,
                email: username,
                password: createHash(password),
                cart: payload._id
            }

            const result = await this.userService.createUser(newUser)
            return res.send({status:'success', payload :result})
            
        } catch (error){
            logger.error(error.name)
            next(error)
        }
    }

    getUser = async (req,res)=>{
        try {
            const{filter} = req.params
            const user = this.userService.getUserBy(filter)
            return res.send({status:'success', payload :user})
        } catch (error){
            logger.error(error.message)
        }
    }

    changePassword = async (req,res)=>{
        try {
            const { token } = req.params;
            const { password } = req.body;
            
            const decoded = jwt.verify(token, objectConfig.jwtSecret);
            const email = decoded.email;

            const filter = {email}

            const user = await this.userService.getUserBy(filter)

            if(createHash(password) === user.password) return res.status(404).send('La contraseña debe ser diferente a la anterior')
            
            const result = await this.userService.updateUser({email},{$set:{password:createHash(password)}})

            return res.send({status:'success', payload :result})
        
        } catch (error){
            logger.error(error.message)
        }
    }

    changeToUserPremium = async (req,res)=>{
        try {
            if(!req.user.email ){res.status(400).send({status:'error', payload:'No se registra usuario que haya hecho inicio de sesion'})}
            const {email} = req.params
            const result = await this.userService.updateUser({email},{$set:{role:'premium'}})
            req.user.role = 'premium'
            console.log(req.user);
            return res.send({status:'success', payload :result})
        } catch (error) {
            logger.error(error.message)
        }
    }


}

export default UsersController