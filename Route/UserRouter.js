import express from "express";
const router= express.Router()
import usercontroller from "../Controller/UserController.js";
//import {registerdata} from '../Controller/UserController.js'
import {register,login,changePassword,loggedInUser,sendUsePasswordResetEmail,userPasswordReset,refressTokengenerate,logOut} from '../Controller/user.js'
import userAuth from '../middlewares/usermidddlewares.js'
//router.post('/register',usercontroller.register)
//router.post('/login',usercontroller.login)
//router.post('/register',registerdata)
// public routes
router.post ('/register',register)
router.post ('/login',login)
router.post('/reset',sendUsePasswordResetEmail)
router.post('/reset/:id/:token',userPasswordReset)
router.post('/refress',refressTokengenerate)
//private routes
router.post('/changepassword',userAuth,changePassword)
router.get('/loggedinuuser',userAuth,loggedInUser)
router.post('/logout',userAuth,logOut)

export default router