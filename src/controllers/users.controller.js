import { userService } from "../service.index.js";
import { cartService } from "../service/index.js";

class UsersController {
    constructor(){
        this.userService = userService
        this.cartService = cartService
    }

    createUser = async (req,res)=>{
        try {
            if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.age){return res.status(404).send('Falta completar campos')}
            const{first_name, last_name, age, email, password} = req.body
            const userFound = await this.userService.getUserBy({email})
            
            //console.log('username:' + username);
            
            if(userFound){
                console.log('El usuario ya existe');
                return res.status(404).send('El usuario ya existe')
            }

            const {payload} = await this.cartService.addCart()

            console.log('newcart:' + payload);

            const newUser ={
                first_name,
                last_name,
                age,
                email: username,
                password: createHash(password),
                cart: payload._id
            }

            const result = await this.userService.createUser(newUser)
            return res.send({status:'success', payload :result})
            
        } catch (error){
            console.log(error);
        }
    }

    getUserBy = async (req,res)=>{
        try {
            const{filter} = req.params
            const user = this.userService.getUserBy(filter)
            return res.send({status:'success', payload :user})
        } catch (error){
            console.log(error);
        }
    }
}

export default UsersController