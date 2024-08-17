export default class UserRepository {
    constructor(UsersDao){
        this.userDao = UsersDao
    }

    async createUser (user){
        return await this.userDao.create(user)
    }
    
    async getUserBy(filter){
        return await this.userDao.getBy(filter)
    }

    async updateUser(filter,object){
        return await this.userDao.update(filter,object)
    }
}
