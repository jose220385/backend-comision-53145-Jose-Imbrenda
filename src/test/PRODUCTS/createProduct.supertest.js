import {expect} from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:3000`)

describe('Testing API Papelera San Gerardo',()=>{
    describe('Testing de Productos', ()=>{
        it('El endpoint api/products debe crear un producto correctamente', async()=>{
            const productMock ={
                code: "222345",
                title: "Objeto 222",
                description: "lalala",
                cost: 3000,
                markdown: 30,
                thumbnail: "./ruta nueva",
                stock: 333,
                category: "Categoria 102",
                subCategory: "Sub Categoria 6",
                brand: "Marca 5",
                provider: "otro",
                owner: "jsimbrenda@gmail.com"
            }
            const{
                statusCode,
                ok,
                _body
            } = await requester.post('/api/products').send(productMock)
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
            expect(_body.payload).to.have.property('_id')
        })
        
    })
})

//node src/test/PRODUCTS/createProduct.supertest.js