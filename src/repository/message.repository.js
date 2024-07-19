export default class MessageRepository {
    constructor(MessagesDao){
        this.messagesDao = MessagesDao
    }

    getMessages = async() =>{return await this.messagesDao.getAll()}

}