import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin","moderator"]
       },
})

const usermodel= mongoose.model('users',userSchema)
export default usermodel