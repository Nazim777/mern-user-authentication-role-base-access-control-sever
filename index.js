import express from "express";
const app= express()
import cors from 'cors'
import router from './Route/UserRouter.js'
import adminrouter from "./Route/AdminRouter.js"; // admin router
import moderatorRouter from './Route/ModeratorRoutes.js' // moderator router
const port= process.env.PORT || 5000
import{database} from './DB/ConnectDb.js'
import env from 'dotenv'
env.config()



// const whitelist = ["http://localhost:3000"]

// const corsOptions = {

//   origin: function (origin, callback) {

//     if (!origin || whitelist.indexOf(origin) !== -1) {

//       callback(null, true)

//     } else {

//       callback(new Error("Not allowed by CORS"))

//     }

//   },

//   credentials: true,

// }

// app.use(cors(corsOptions))
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(express.json())
app.use(router)
// admin router 
app.use(adminrouter)
//moderator router 
app.use(moderatorRouter)
app.use(express.urlencoded({extended:false}))



//app.use(cors())



database()
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})