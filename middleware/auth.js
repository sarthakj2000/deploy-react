const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function(req,res,next){
    //Get the token from the header
    const token=req.header('x-auth-token');
    
    //check if not token
    if(!token){
        return res.status(401).json({msg:'no token authorization denied'});
    }
    try{
        const decode=jwt.verify(token,config.get('jwtSecret'));//verify the token with current login token and retreive the payload from token and puts in decode
        req.user=decode.user;
        next();
    }catch(err){
        res.status(401).json({msg:'token in not valid'})
    }
}