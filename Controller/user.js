import usermodel from "../Model/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/emailConfig.js";


const register =async(req,res)=>{
   try {
    const{name,email,password} = req.body 
    if(name,email,password){
        const user= await usermodel.findOne({email})
        if(user){
           // res.status(400).json({message:'user already exist'})
            res.json({status:'failed','message':'user already exist'})
        }else{
            
            const hashpassword = await bcrypt.hash(password,10)
           const data = usermodel({
            name,email, password:hashpassword
        
           })
           await data.save()
           const saved_user= await usermodel.findOne({email})
           const token =  jwt.sign({id:saved_user._id,role:saved_user.role},process.env.jwt_secret,{expiresIn:'10h'})
        //    const refresstoken = jwt.sign({id:saved_user._id},process.env.jwt_secret2) //refresstoken 
        //   // refresstokens.push(refresstoken)
      
           res.status(201).json({message:'registered successfully!','token':token})
        }
       
    }else{
       // res.status(400).json({message:'all fields are required'})
        res.json({status:'failed','message':'all fields are required'})
    }

    
   } catch (error) {
   // res.status(400).json({message:'something went wrong ', error})
    res.json({status:'failed','message':'something went wrong',error})
    
   }
}



const login = async(req,res)=>{
    try {

        const {email,password} = req.body 
        const user = await usermodel.findOne({email})
        
        if(user){
            const validation = await bcrypt.compare(password,user.password) 
            

            if(validation){
                
                const token =  jwt.sign({id:user._id,role:user.role},process.env.jwt_secret,{expiresIn:'10h'})

                const refresstoken = jwt.sign({id:user._id},process.env.jwt_secret2) //refresstoken 
           refresstokens.push(refresstoken)
          // console.log(refresstokens)
         
               
               res.status(201).json({message:'login successfully','token':token,'refressToken':refresstoken})

               

            }else{
               // res.status(400).json({message:'authentication failed'})
                res.json({status:'failed','message':'authentication failed'})
            }


        }else{
           // res.status(400).json({message:'user does not exist'})
            res.json({status:'failed','message':'user does not exist'})
        }
         



    } catch (error) {
      //  res.status(500).json({message:'something went wrong',error})
        res.json({status:'failed','message':'something went wrong'})
        console.log(error)
        
    }
}

const changePassword=async(req,res)=>{
    const {password,confirm_password} =req.body 
    if(password&&confirm_password){
        if(password===confirm_password){
            try {
                const hashpassword = await bcrypt.hash(password,10)
            const {_id} = req.user 
            await usermodel.findByIdAndUpdate(_id,{$set:{
                password:hashpassword 
            }})
            res.json({status:'success','message':'password changed successfully'})
            } catch (error) {
                res.json({status:'failed','message':'something went wrong '})
                
            }

        }else{
            res.json({status:'failed','message':'password and confirm password does not match'})
        }

    }else{
        res.json({status:'failed','message':'all fields are required'})
    }
}
const loggedInUser= async(req,res)=>{
    res.json({'user':req.user})
}

const sendUsePasswordResetEmail= async(req,res)=>{
    const {email} = req.body 
    const user = await usermodel.findOne({email})
    if(user){
        const secret= user._id + process.env.jwt_secret 
        const token = jwt.sign({id:user._id},secret,{expiresIn:'10h'})
        const link = `http://127.0.0.1:3000/reset/${user._id}/${token}`
        console.log(link)
        // send email
        const mailoption = {

           from: process.env.EMAIL_FROM, // sender address
            to: user.email, // list of receivers
            subject: "Blog application.... password reset link", // Subject line
            text:'hello this is a valid email for reset your password',
         html:`<a href=${link}>Click Here to reset your password</a>` 
        

        }

        transporter.sendMail(mailoption,(err,info)=>{
            if(err){
                console.log(err)
            }else{
               console.log('email sent')
            }
        })
         



       res.json({status:'success','message':'password reset email sent ,please check your email'})

    }else{
        res.json({status:'failed','message':'email does not exist'})
    }
}

const userPasswordReset = async(req,res)=>{
    const {password,confirm_password} = req.body 
    const {id,token}= req.params 
   // console.log({'id':id,'token':token})
    const user = await usermodel.findById(id)
    const secret_2 = user._id + process.env.jwt_secret
    jwt.verify(token,secret_2)
   
    try {

        
        if(password&&confirm_password){
            if(password===confirm_password){
                const hashpassword= await bcrypt.hash(password,10)
                await usermodel.findByIdAndUpdate(user._id,{$set:{
                    password:hashpassword
                }})
                res.json({status:'success','message':'password reset successfully'})

            }else{
                res.json({status:'failed','message':'password and confirm password does not match'})
            }

        }else{
            res.json({status:'failed','message':'all fields are required'})
        }
    } catch (error) {
        
    }
}

let refresstokens =[] //refrsstoken

const refressTokengenerate = async(req,res)=>{
const refresstoken = req.body.token
if(refresstoken){


    if(refresstokens.includes(refresstoken)){

        const verifyrefresstoken = jwt.verify(refresstoken,process.env.jwt_secret2)
        const {id} = verifyrefresstoken
        const user =  await usermodel.findById(id).select('-password')
        if(user){
            refresstokens= refresstokens.filter((token)=>token!==refresstoken)
        const newToken = jwt.sign({id:user._id},process.env.jwt_secret,{expiresIn:'10h'})
        const newRefressToken = jwt.sign({id:user._id},process.env.jwt_secret2)
        refresstokens.push(newRefressToken)
        res.status(200).json({
            token:newToken,
            refresstoken:newRefressToken
        })
        }else{
            res.json({status:'failed','message':'something went wrong!'})
        }
       
    }else{

        res.json({status:'failed','message':'refress token not valid!'})

    }
    
}else{
res.json({status:'failed','message':'you are not authenticated users!'})
}

}

const logOut=async(req,res)=>{
    const refresstoken = req.body.token 
    refresstokens= refresstokens.filter(token=>token !== refresstoken)
    res.json({status:'success','message':'user log out successfully!'})
}

export {register,login,changePassword,loggedInUser,sendUsePasswordResetEmail,userPasswordReset,refressTokengenerate,logOut}