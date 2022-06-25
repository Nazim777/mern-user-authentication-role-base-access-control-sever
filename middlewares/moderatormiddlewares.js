const moderatormiddlewares = async(req,res,next)=>{
   try {
    if(req.user.role==='moderator'){ //if(req.user.role==='moderator' || 'admin')
        return next()

    }else{
        res.json({status:'failed','message':'you do not have the permission to perform this action!'})
    }
   } catch (error) {
    res.json({status:'failed','message':'something went wrong!'})
    
   }
}
export default moderatormiddlewares