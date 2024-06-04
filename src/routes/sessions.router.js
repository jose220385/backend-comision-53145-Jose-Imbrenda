import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js"
import MDBUserManager from "../dao/MongoDB.UserManager.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import passport from "passport";

const router = new Router() 
const userManager = new MDBUserManager()

/* router.post('/register', async (req,res)=>{
    const{first_name, last_name,email,password} = req.body
    if(!email || !password || !first_name || !last_name) return res.status(401).send({status:'error', error:'Faltan Datos'})
    const userExist = await userManager.getUserBy({email})
    console.log(userExist);
    if(userExist) return res.status(401).send({status:'error', error:'El usuario ya existe'})
    const newUser ={
        first_name,
        last_name,
        email,
        password: createHash(password),
        role: 'user'
    }
    const result = await userManager.createUser(newUser)
    console.log(result);

    res.redirect('/login')

})
 */


/* router.post('/login', async (req,res)=>{
    try{
    const {password,email} = req.body
    if(!email || !password) return res.status(401).send({status:'error', error:'Faltan Datos'})

    const userFound = await userManager.getUserBy({email})

    if(!userFound) return res.status(401).send({status:'error', error:'Usuario No encontrado'})
    if(!isValidPassword(password,{password: userFound.password})) return res.status(401).send({status:'error', error:'Contraseña Incorrecta'})

    req.session.user ={
        email,
        name: userFound.first_name,
        admin: userFound.email === 'adminCoder@coder.com'
    }
    
    return res.redirect('/products') 
} catch (error){
    if(error) return res.redirect('/login')
}
}) */

//Register con Passport
router.post('/register', passport.authenticate('register',{failureRedirect:'/failRegister'}), async (req,res)=>{
    res.redirect('/login')
})
router.post('/failRegister', async (req,res)=>{
    console.log('fallo la estrategia de registro');
    res.send({error:'failed'})
}) //ruta por si falla el register

//Login con Passport
router.post('/login', passport.authenticate('login',{failureRedirect:'/failLogin'}),async (req,res)=>{
    if(!req.user) return res.status(400).send({status:'error', error:'credenciales invalidas'})
    req.session.user ={
        email: req.user.email,
        first_name: req.user.first_name,
        admin: req.user.email === 'adminCoder@coder.com'
    }
    return res.redirect('/products')
    //res.send({status:'succes', payload:'login exitoso'})
})
router.post('/failLogin', async (req,res)=>{
    console.log('fallo la estrategia de login');
    res.send({error:'failed'})
})

//Login con github

router.get('/github',passport.authenticate('github',{scope: 'user:email'}), async (req,res)=>{})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}), (req,res)=>{
    console.log(req.user);
    req.session.user = req.user
    res.redirect('/products')
})


router.get('/logout',(req,res)=>{
    req.session.destroy(err =>{
        if(err) return({status:'error', error:err})
    })
    return res.redirect('/login')
} )

router.get('/current', auth, (req,res) =>{
    return res.send('datos sensibles')
})

export default router