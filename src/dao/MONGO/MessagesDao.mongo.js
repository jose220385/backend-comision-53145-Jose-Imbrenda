import DaoMongo from "./daoMongo.js";
import { messageModel } from "./models/message.model.js";

export default class MessageDaoMongo extends DaoMongo{
    constructor(){
        super(messageModel)
    }

    /* getMessages = async() =>{
        const messages = await messageModel.find().lean()
        return messages
    } */
}
