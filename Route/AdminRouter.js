import express from 'express'
const router = express.Router()
import adminmidddlewares from '../middlewares/adminmiddlewares.js'
import userAuth from '../middlewares/usermidddlewares.js'
import { getAllUser,deleteUser,updateUser,createUser } from '../Controller/admin.js'
router.get('/admin/allusers',userAuth,adminmidddlewares,getAllUser)
router.delete('/admin/delete/:id',userAuth,adminmidddlewares,deleteUser)
router.patch('/admin/update/:id',userAuth,adminmidddlewares,updateUser)
router.post('/admin/create',userAuth,adminmidddlewares,createUser)
export default router