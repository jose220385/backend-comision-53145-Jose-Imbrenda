import { messageModel } from "./models/message.model.js";

export default class MDBMessageManager{
    constructor(){}

    getMessages = async() =>{
        const messages = await messageModel.find().lean()
        return messages
    }
}
