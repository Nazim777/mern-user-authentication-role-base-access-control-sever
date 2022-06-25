import express from 'express'
const router = express.Router()
import userAuth from '../middlewares/usermidddlewares.js'
import moderatormiddlewares from '../middlewares/moderatormiddlewares.js'
import { getAllUser,createUser } from '../Controller/Moderator.js'
router.get('/moderator/allusers',userAuth,moderatormiddlewares,getAllUser)
router.post('/moderator/createuser',userAuth,moderatormiddlewares,createUser)
export default router