import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js"
import MDBUserManager from "../dao/MongoDB.UserManager.js";

const router = new Router() 
const userManager = new MDBUserManager()

router.post('/register', async (req,res)=>{
    const{first_name, last_name,email,password} = req.body
    if(!email || !password || !first_name || !last_name) return res.status(401).send({status:'error', error:'Faltan Datos'})
    const userExist = await userManager.getUserBy({email})
    console.log(userExist);
    if(userExist) return res.status(401).send({status:'error', error:'El usuario ya existe'})
    const newUser ={
        first_name,
        last_name,
        email,
        password,
        role: 'user'
    }
    const result = await userManager.createUser(newUser)
    console.log(result);

    res.send('usuario creado')

})


router.post('/login', async (req,res)=>{
    const {password,email} = req.body
    if(!email || !password) return res.status(401).send({status:'error', error:'Faltan Datos'})

    const userFound = await userManager.getUserBy({email})

    if(!userFound) return res.status(401).send({status:'error', error:'Usuario No encontrado'})
    if(password !== userFound.password) return res.status(401).send({status:'error', error:'Contraseña Incorrecta'})

    req.session.user ={
        email,
        name: userFound.first_name,
        admin: userFound.email === 'adminCoder@coder.com'
    }
    return res.send({status:'success', payload: req.session.user})
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err =>{
        if(err) return({status:'error', error:err})
        return res.send('logout')
    })
} )

router.get('/current', auth, (req,res) =>{
    return res.send('datos sensibles')
})

export default router