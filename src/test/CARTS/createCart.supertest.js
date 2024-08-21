import {expect} from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:3000`)

describe('Testing API Papelera San Gerardo',()=>{
    describe('Testing de Carts', ()=>{
        it('El endpoint api/carts debe crear un carrito correctamente', async()=>{
            const{
                statusCode,
                ok,
                _body
            } = await requester.post('/api/carts')
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
            expect(_body.payload).to.have.property('_id')
        })
        
    })
})