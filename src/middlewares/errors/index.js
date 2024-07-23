import { EError } from "../../service/errors/enums.js";

//Funcion que retorna un middleware
export const handleErrors = () => (error,req,res,next) =>{
    console.log(error.cause);
    switch (error.code) {
        case EError.ROUTING_ERROR:
            return res.send({status:'error', error: error.name})
            break;
        case EError.INVALID_TYPES_ERROR:
            return res.send({status:'error', error: error.name})
            break;
        case EError.DATABASE_ERROR:
            return res.send({status:'error', error: error.name})
            break;
        case EError.DUPLICATED_DATA_ERROR:
            return res.send({status:'error', error: error.name})
            break;
        case EError.EMPTY_CART_ERROR:
            return res.send({status:'error', error: error.name})
            break;
        default:
            return res.send({status:'error', error: 'Error no identificado'})
            break;
    }
}