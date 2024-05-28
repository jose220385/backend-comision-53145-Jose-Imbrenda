import { userModel } from "./models/user.model.js";

export default class MDBUserManager {
    constructor() {
    }

async createUser (user){
    return await userModel.create(user)
}

async getUserBy(filter){
    return await userModel.findOne(filter)
}


}