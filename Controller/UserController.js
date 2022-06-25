
import usermodel from "../Model/UserModel.js";



// const registerdata=async (req, res)=>{
//     console.log(req.body)
//     res.send(req.body)

// }
// export {registerdata}
class usercontroller{
    static register= (req,res)=>{
        const {name,email,password} = req.body 
           //console.log(req.body)
     
       
usermodel.findOne({email:email},async(err,doc)=>{
    if(doc){
        res.send({message:'user already exist'})
    }else{

      
            const data= new usermodel({
                name,
                email,
                password
            })
            const data1= await data.save()
           // console.log(data1)
            //res.send(data1)
            res.send({message:'registered successfully'})
           

    }
    if(err){
        console.log(err)
    }
   
})   
   
}

static login= (req,res)=>{
    const {email,password} = req.body
    usermodel.findOne({email:email},(err,doc)=>{
        if(doc){
            if(doc.password==password){
                res.send({message:'login successfully'})
            }else{
                res.send({message:'your password is wrong'})
            }
        }else{
            res.send({message:'user does not exist'})
        }
    })
}



}
export default usercontroller
