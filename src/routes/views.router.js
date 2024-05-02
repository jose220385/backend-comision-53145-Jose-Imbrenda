import { Router } from "express";
//import ProductManager from '../dao/MongoDB.ProductManager.js'
import MDBProductManager from "../dao/MongoDB.ProductManager.js";
import { messageModel } from "../dao/models/message.model.js";
const router = new Router()
const productManager = new MDBProductManager();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts()
    res.render('home', {
        title: 'Productos',
        products,
        styles: 'homeStyles.css'
    })
})

router.get('/realTimeProducts', async (req,res)=>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts', {
        title: 'Productos en tiempo real',
        products : products,
        styles: 'homeStyles.css'
    })
})

router.get('/chat', async (req,res)=>{
    const messages = await messageModel.find().lean()
    const {io} = req
    io.on('message', data => {
        messageModel.create(data)
        // emitimos los mensajes
        io.emit('messageLogs', messages)
    })
    res.render('chat', {
        title: 'Chat:',
        messages,
        styles: 'homeStyles.css'
    })
})


export default router