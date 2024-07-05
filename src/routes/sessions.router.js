import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js"
import MDBUserManager from "../dao/MongoDB.UserManager.js";
//import { createHash, isValidPassword } from "../utils/bcrypt.js";
import passport from "passport";
//import { generateToken } from "../utils/jsonwebtoken.js";
//import { passportCall } from "../utils/passportCall.js";
//import { authorization } from "../utils/authorizationJWT.js";
import MDBCartManager from "../dao/MongoDB.CartManager.js";


const router = new Router() 
const userManager = new MDBUserManager()
const cartManager = new MDBCartManager()

/* router.post('/register', async (req,res)=>{
    console.log(req.body);
    const{first_name, last_name,email,password, age} = req.body
    if(!email || !password || !first_name || !last_name || !age) return res.status(401).send({status:'error', error:'Faltan Datos'})
    const userExist = await userManager.getUserBy({email})
    
    if(userExist) return res.status(401).send({status:'error', error:'El usuario ya existe'})
    
    const newCart = await cartManager.addCart()

    console.log('newCart:\n'+ newCart);
    console.log('newCartID:\n'+ newCart._id);

    const newUser ={
        first_name,
        last_name,
        email,
        password: createHash(password),
        role: 'user',
        age,
        cart: newCart._id
    }

    const result = await userManager.createUser(newUser)
    
    const role = result.email === 'adminCoder@coder.com'? 'admin':'user'

    console.log(role);

    const token = generateToken({
        id: result._id,
        email: result.email,
        name: result.first_name,
        role,
        cart: result.cart
    })

    return res
    .cookie('papeleraCookieToken', token,{
        maxAge:60*60*1000*24,
        httpOnly: true
    })
    .send({status:'success'})

})



router.post('/login', async (req,res)=>{
    try{
    const {password,email} = req.body
    if(!email || !password) return res.status(401).send({status:'error', error:'Faltan Datos'})

    const userFound = await userManager.getUserBy({email})
    if(!userFound) return res.status(401).send({status:'error', error:'Usuario No encontrado'})
    if(!isValidPassword(password,{password: userFound.password})) return res.status(401).send({status:'error', error:'Contraseña Incorrecta'})

   /*  req.session.user ={
        email,
        name: userFound.first_name,
        admin: userFound.email === 'adminCoder@coder.com'
    } 

    const role = userFound.email === 'adminCoder@coder.com'? 'admin':'user'

    console.log(role);

    const token = generateToken({
        id: userFound._id,
        email: userFound.email,
        name: userFound.first_name,
        cart: userFound.cart,
        role
    })

    console.log(req.user);

    return res
    .cookie('papeleraCookieToken', token,{
        maxAge:60*60*1000*24,
        httpOnly: true
    })
    .send({status:'success'})
    
    //return res.redirect('/products') 
} catch (error){
    if(error) return res.redirect('/login')
}
}) */

//Register con Passport-session
router.post('/register', passport.authenticate('register',{failureRedirect:'/failRegister'}), async (req,res)=>{
    return res.send({status:'succes', payload: 'usuario registrado con exito'})
})
router.post('/failRegister', async (req,res)=>{
    console.log('fallo la estrategia de registro');
    res.send({error:'failed'})
}) //ruta por si falla el register

//Login con Passport-session
router.post('/login', passport.authenticate('login',{failureRedirect:'/failLogin'}),async (req,res)=>{
    if(!req.user) return res.status(400).send({status:'error', error:'credenciales invalidas'})
    req.session.user ={
        email: req.user.email,
        first_name: req.user.first_name,
        role: req.user.email === 'adminCoder@coder.com'? 'admin':'user',
        cart: req.user.cart
    }
    //res.redirect('/products')
    return res.send({status:'succes', payload: req.session.user})
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
   /*  try{
        res.clearCookie('papeleraCookieToken').status(204).send()
        return res.redirect('/login')
    } catch(error){
        console.log(error);
    } */
} )

/* router.get('/current', passport.authenticate('jwt', {session: false}), (req,res) =>{
    console.log(req.user);
    return res.send('datos sensibles')
}) */

router.get('/current', auth,(req,res) =>{
    console.log(req.user);
    return res.send('datos sensibles')
})

export default router