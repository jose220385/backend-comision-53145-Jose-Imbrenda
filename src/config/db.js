import mongoose from "mongoose";

const password = () =>{
    const password = '4F4ZJdNwWpQy9kl1'
    return password
}
export const connect = ()=>{
    mongoose.connect(`mongodb+srv://jsimbrenda:${password()}@papelerasangerardo.wphphau.mongodb.net/?retryWrites=true&w=majority&appName=papeleraSanGerardo`)
}