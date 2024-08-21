import {expect} from "chai";
import supertest from "supertest";
import { userService } from "../../service.js";

const requester = supertest(`http://localhost:3000`)

describe('Testing API Papelera San Gerardo',()=>{
    describe('Testing de Session', ()=>{
        it('El endpoint api/session/register debe registrar un usuario en la BD correctamente', async()=>{
            const userMock ={
                first_name:"Pedro",
                last_name: "Escamoso",
                email: "pescamoso@gmail.com",
                password: "123456",
                age: 39
            }
            const{
                statusCode,
                ok,
                _body
            } = await requester.post('/api/sessions/register').send(userMock)
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
            expect(_body).to.have.property('payload')
            const userFound = userService.getUserBy({email:"pescamoso@gmail.com"})
            expect(_body).to.have.property('_id')
        })
        it('El endpoint api/sessions/loggin debe logear al usuario correctamente y crear la session', async()=>{
            const userData = {
                email: "pescamoso@gmail.com",
                password: "123456"
            }
            const{
                statusCode,
                ok,
                _body
            } = await requester.post('/api/sessions/loggin').send(userData)
            console.log(statusCode);
            console.log(ok);
            console.log(_body);
            expect(_body).to.have.property('payload')
            expect(_body.payload).to.have.property('first_name')
        })
        
    })
})