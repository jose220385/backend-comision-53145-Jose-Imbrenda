import DaoMongo from "./daoMongo.js";
import { userModel } from "./models/user.model.js";

export default class UsersDaoMongo extends DaoMongo{
    constructor() {
        super(userModel)
    }

/* async createUser (user){
    return await userModel.create(user)
}

async getUserBy(filter){
    return await userModel.findOne(filter)
}
 */

}