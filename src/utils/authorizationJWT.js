export const authorization = (role) =>{
    return async(req,res,next) => {
        if(!req.user) return res.status(401).send({error:'Not authorized'})
        if(req.user.role !== role) return res.status(401).send({error:'Not authorized'})
        next()
    }
}