import passport from "passport";
import local from 'passport-local'
//import jwt from 'passport-jwt'
//import MDBuserService from "../dao/MongoDB.userService.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import GithubStrategy from 'passport-github2'
//import cookieParser from "cookie-parser";
//import { PRIVATE_KEY } from "../utils/jsonwebtoken.js";
//import MDBcartService from "../dao/MongoDB.cartService.js";
import { cartService, userService } from "../service/index.js";

const LocalStrategy = local.Strategy
//const userService = new MDBuserService()
//const cartService = new MDBcartService()
/* const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt */


export const initPassport = () =>{
    /* 
    //Funcion para leer las cookies
    const cookieExtractor = (req)=>{
        console.log('Cookies:' + req?.cookies);
        console.log('Token en CookieExtractor:' + req?.cookies.token);
        let token
        if(req && req.cookies){
            token = req.cookies['papeleraCookieToken']
        }
        return token
    }
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:PRIVATE_KEY
    }, async(jwt_payload, done)=>{
        try {
            if(!jwt_payload) {
                //redireccionar a login
                return done(null, false, {messages:'No user found'})
            }
            return done (null, jwt_payload)
        } catch (error) {
            return done (error);
        }
    }))
 */


    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //para que nos permita acceder al objeto request
        usernameField: 'email' //cambio el username por el campo email
    },async(req,username,password,done)=>{
        //en esta callback se ejecuta el registro
        try{
            if(!req.body.first_name || !req.body.last_name){return done ('Falta completar campos')}
            const{first_name, last_name, age} = req.body
            const userFound = await userService.getUserBy({email:username})
            
            //console.log('username:' + username);
            
            if(userFound){
                console.log('El usuario ya existe');
                return done(null,false)
            }

            const cart = await cartService.addCart()

            console.log('newcart:' + cart);

            const newUser ={
                first_name,
                last_name,
                age,
                email: username,
                password: createHash(password),
                cart
            }

            const result = await userService.createUser(newUser)
            return done (null, result)

        } catch(error){
            return done ('Error al registrar usuario'+ error)
        }
        
    }))
    
    passport.use('login', new LocalStrategy({
        usernameField: 'email' //no se usa passReqToCallback porque no necesitamos acceso al req. el password y el username(email) lo captura internamente
    },async(username,password,done)=>{
        try{
            const user= await userService.getUserBy({email: username})

            if(!user) return done (null, false)
            if(!isValidPassword(password,{password: user.password})) return done (null, false)

            return done (null, user) // crea la propiedad user en la req => req.user
        } catch (error) {
            return done ('Error en el proceso de login'+ error)
        }
    }))

    passport.serializeUser((user,done)=>{ // crea el id de la session 
        done(null,user._id) // usamos el id del usuario Mongo
    }) 
    passport.deserializeUser(async(id,done)=>{ //extrae el usuario del session a traves del id y lo busca en la BD
        try{
            const user = await userService.getUserBy({_id:id})
            done(null, user)
        } catch (error){
            done(error)
        }
    }) 

    passport.use('github', new GithubStrategy({
        clientID:'Ov23lihTNNui1435BTH0',
        clientSecret:'65a271cfd75e8617c3ca5bd2b85d7539ee55733a',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken,refreshToken,profile,done)=>{
        try{
            console.log(profile);
            const user = await userService.getUserBy({email:profile._json.email})
            if(!user){
                let newUser ={
                    first_name: profile._json.email,
                    last_name: '',
                    email: profile._json.email,
                    password:''
                }
                let result = await userService.createUser(newUser)
                done (null,result)
            } else {
                done(null,user)
            }
        } catch(error){
            console.log(error);
        }
    }) )

}