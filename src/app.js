import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

/* app.get('/products', async (req,res)=>{
    let {limit} = req.query
    const products = await productManager.getProducts()
    if(limit){
        const limitedProducts = products.slice(0,limit)
        res.send({status: 'success', payload: limitedProducts})
    }
    res.send({status: 'success', payload: products})
})

app.get('/products/:pid', async (req,res)=>{
    const {pid} = req.params
    const productFound = await productManager.getProductById(pid)
    if(!productFound){res.status(404).send({status:'error', error: 'Producto no encontrado'})}
    res.send({status: 'success', payload: productFound})
})

app.post('/products', async (req,res)=>{
    const{code, title, description, price, stock}=req.body
    if (!code || !title || !description || !price || !stock) {
        return res.send({status:'error', error:'Faltan Campos'})
    }
    await productManager.addProduct(req.body)
    res.send({status: 'success', payload: req.body})
})

app.put('/products/:pid', async (req,res)=>{
    const {pid} = req.params
    await productManager.updateProduct(pid,req.body)
    res.send({status: 'success', payload: req.body})
}) */

app.listen(8080, err =>{
    if(err) console.log(err)
    console.log('Server escuchando en el puerto 8080')
})


//req.body Prueba Post

/* {
    code: 123456,
    title: "req.body x post",
    description: "descripcion de req.body x post",
    price: 600,
    thumbnail: "ubicacion",
    stock: 300
  } */