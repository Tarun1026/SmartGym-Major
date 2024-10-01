import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import scriptpyHandler from './api/scriptpy.js';
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())
    
app.post('/api/scriptpy', scriptpyHandler); 
import { spawn } from 'child_process';
let exerciseProcess = null;


import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)
export {app}