module.exports =   function (req,res,next){
        const token = req.header('x-auth-token');
        console.log(token)
        
        if(!token )
        return res.status(401).json({msg:'No token, authentication required'});
                next();

            
        
    }
  