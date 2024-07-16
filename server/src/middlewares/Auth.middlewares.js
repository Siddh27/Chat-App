import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json("You are not authenticated!")
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
        if(err){
            res.status(403).json("Invalid Token")
        }
        req.userId = payload.userId
        next()
    }); 
}