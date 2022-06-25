import  Jwt  from "jsonwebtoken";
import usermodel from "../Model/UserModel.js";
const userAuth= async(req,res,next)=>{
    const {authorization} = req.headers 
    if(authorization&&authorization.startsWith('Bearer')){
        try {
            const token = authorization.split(' ')[1]
            const verifiedToken = Jwt.verify(token,process.env.jwt_secret)
            const {id} = verifiedToken
            req.user= await usermodel.findById(id).select('-password')
            next()
            
        } catch (error) {
            res.json({status:'failed','message':'token not valid'})
            
        }

    }else{
        res.json({status:'failed','message':'user not authenticated'})
    }

}
export default userAuth