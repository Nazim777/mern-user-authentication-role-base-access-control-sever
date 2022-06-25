import usermodel from "../Model/UserModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const getAllUser =async(req,res)=>{
const users = await usermodel.find()
if(users){
    res.json({status:'success','users':users})
}else{
    res.json({status:'failed','message':'something went wrong'})
}
}

const deleteUser= async(req,res)=>{
    const {id} = req.params
   // console.log(id) 
   if(req.user.id===id){
    res.json({status:'failed','message':'admin can not delete themself!'})
   }else{
    const user = await usermodel.findById(id)
    if(user){
        await usermodel.findByIdAndDelete(id) 
        res.json({status:'success','message':'user delete successfully!'})
    }else{
        res.json({status:'failed','message':'user does not exist!'})
    }
   }
}

const updateUser= async(req,res)=>{
    const {id} = req.params 
    const data = req.body 
    
   if(req.user.id===id){
    res.json({status:'failed','message':'admin can not update themself!'})
   }else{

    try {
        const user = await usermodel.findById(id)
        if(user){
            await usermodel.findByIdAndUpdate(user._id,data)
            res.json({status:'success','message':'user updated successfully!'})
        }else{
            res.json({status:'failed','message':'user does not exist!'})
        }
    } catch (error) {
        res.json({status:'failed','message':'something went wrong!'})
        
    }
   }
}

const createUser = async(req,res)=>{
    try {
        const{name,email,password} = req.body 
        if(name,email,password){
            const user= await usermodel.findOne({email})
            if(user){
               
                res.json({status:'failed','message':'user already exist'})
            }else{
                
                const hashpassword = await bcrypt.hash(password,10)
               const data = usermodel({
                name,email, password:hashpassword
            
               })
               await data.save()
               const saved_user= await usermodel.findOne({email})
               const token =  jwt.sign({id:saved_user._id,role:saved_user.role},process.env.jwt_secret,{expiresIn:'10h'})
          
               res.status(201).json({message:'user created successfully!','token':token})
            }
           
        }else{
           
            res.json({status:'failed','message':'all fields are required'})
        }
    
        
       } catch (error) {
      
        res.json({status:'failed','message':'something went wrong',error})
        
       }
}




export {getAllUser,deleteUser,updateUser,createUser}