const jwt = require('jsonwebtoken')
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization']
    if(!auth){
       return res.status(403).json({
        message:"Unauthorized, Jwt token is required"
       })
    }try{
         const decoded = jwt.verify(auth,process.env.jwt_secret)
         req.user = decoded;
         next();

    }catch(error){
          return res.json({message:'Unauthorized ,JWT token wrong'})
    }
}

module.exports = ensureAuthenticated;