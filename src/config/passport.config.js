import passport from "passport";
import local from 'passport-local'
import MDBUserManager from "../dao/MongoDB.UserManager.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import GithubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy
const userManager = new MDBUserManager()

export const initPassport = () =>{
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //para que nos permita acceder al objeto request
        usernameField: 'email' //cambio el username por el campo email
    },async(req,username,password,done)=>{
        //en esta callback se ejecuta el registro
        try{
            if(!req.body.first_name || !req.body.last_name){return done ('Falta completar campos')}
            const{first_name, last_name} = req.body
            const userFound = await userManager.getUserBy({email:username})
            if(userFound){
                console.log('El usuario ya existe');
                return done(null,false)
            }
            const newUser ={
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }

            const result = await userManager.createUser(newUser)
            return done (null, result)

        } catch(error){
            return done ('Error al registrar usuario'+ error)
        }
        
    }))
    
    passport.use('login', new LocalStrategy({
        usernameField: 'email' //no se usa passReqToCallback porque no necesitamos acceso al req. el password y el username(email) lo captura internamente
    },async(username,password,done)=>{
        try{
            const user= await userManager.getUserBy({email: username})

            if(!user) return done (null, false)
            if(!isValidPassword(password,{password: user.password})) return done (null, false)
        
            /* req.session.user ={
                email,
                name: userFound.first_name,
                admin: userFound.email === 'adminCoder@coder.com'
            } */

            return done (null, user) // crea la propiedad user en la req => req.user
        } catch (error) {
            return done ('Error en el proceso de login'+ error)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID:'Ov23lihTNNui1435BTH0',
        clientSecret:'65a271cfd75e8617c3ca5bd2b85d7539ee55733a',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken,refreshToken,profile,done)=>{
        try{
            console.log(profile);
            const user = await userManager.getUserBy({email:profile._json.email})
            if(!user){
                let newUser ={
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password:''
                }
                let result = await userManager.createUser(newUser)
                done (null,result)
            } else {
                done(null,user)
            }
        } catch(error){
            console.log(error);
        }
    }) )


    passport.serializeUser((user,done)=>{ // crea el id de la session 
        done(null,user._id) // usamos el id del usuario Mongo
    }) 
    passport.deserializeUser(async(id,done)=>{ //extrae el usuario del session a traves del id y lo busca en la BD
        try{
            const user = await userManager.getUserBy({_id:id})
            done(null, user)
        } catch (error){
            done(error)
        }
    }) 
}