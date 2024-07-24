import { objectConfig } from "../dotenv.config.js";
import UsersCurrentDto from "../dtos/usersCurrent.dto.js";
import { userService } from "../service/index.js";
import logger from "../utils/loggers.js";

class SessionsController{
    constructor(){
        this.adminMail = objectConfig.adminMail
    }
    
    register = async (req,res)=>{
        try {
            return res.send({status:'succes', payload: 'usuario registrado con exito'})
        } catch (error) {
            logger.error(error.message)        
        }   
    }

    failRegister = async (req,res)=>{
        try {
            logger.error('Fallo en la estrategia de registo')
            return res.send({error:'failed'})
        } catch (error) {
            logger.error(error)        
        }   
    }

    login = async (req,res)=>{
        try {
            if(!req.user) return res.status(400).send({status:'error', error:'credenciales invalidas'})
            req.session.user ={
            email: req.user.email,
            first_name: req.user.first_name,
            role: req.user.email === objectConfig.adminMail? 'admin':'user',
            cart: req.user.cart
        }
            logger.info('usuario logeado')
            return res.send({status:'succes', payload: req.session.user})
        } catch (error) {
            logger.error(error.message)
        }

    }
    failLogin = async (req,res)=>{
        try {
            console.log('fallo la estrategia de login');
            return res.send({error:'failed'})
        } catch (error) {
            logger.error(error.message)        
        }   
    }

    githubLogin = async (req,res)=>{}

    githubCallback = (req,res)=>{
        console.log(req.user);
        req.session.user = req.user
        logger.info('Sesion de usuario iniciada con Github')
        res.redirect('/products')
    }

    logout = (req,res)=>{
        try {
            req.session.destroy(err =>{
                if(err) return({status:'error', error:err})
            })
            logger.info('Sesion de usuario terminada')
            return res.redirect('/login')
           /*  try{
                res.clearCookie('papeleraCookieToken').status(204).send()
                return res.redirect('/login')
            } catch(error){
                console.log(error);
            } */
        } catch (error) {
            logger.error(error.message)        
        }   
        
    }

    current = (req,res) =>{
        try {
            const{email} = req.user
            const user = userService.getUserBy({email})
            const userDTO = new UsersCurrentDto(user)
            //console.log(req.user);
            return res.send(userDTO)
        } catch (error) {
            logger.error(error.message)        
        }      
    }

    pruebas = (req,res) =>{
        try {
            const {adminMail} = objectConfig
            console.log(objectConfig);
            return res.send('Response:' + adminMail)
        } catch (error) {
            logger.error(error.message)        
        }      
    }

    }

export default SessionsController