export function auth (req,res,next){
    if(req.session?.user?.role === 'admin'){
        return next()
    }
    /* if(req.user?.admin){
        return next()
    } */
    return res.status(401).send('error de autorizacion')
}