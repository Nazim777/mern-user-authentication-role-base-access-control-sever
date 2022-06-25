const adminmidddlewares=async(req,res,next)=>{
    try {
        if(req.user.role==='admin'){
            return next()

        }else{
            res.json({status:'failed','message':'you do not have the permission to perform this action'})
        }
    } catch (error) {
        res.json({status:'failed','message':'something went wrong'})
        
    }
}
export default adminmidddlewares 