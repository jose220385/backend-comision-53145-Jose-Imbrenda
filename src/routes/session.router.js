import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";

const router = new Router() 

/* router.get('/', (req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
        console.log();
    } else{
        req.session.counter = 1
        res.send('Bienvenidos')
    }
}) */

router.post('/login', (req,res)=>{
    const {password,email} = req.body
    if(email!='jsimbrenda@gmail.com' || password!='12345') return res.send('login failed')

    req.session.user ={
        email,
        admin:'true'
    }
    return res.send(req.session.user)
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