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

app.post('/start-exercise', (req, res) => {
  const { exercise, count } = req.body;

  // Spawn the Python process to start real-time detection
  exerciseProcess = spawn('python', ['D:/smartgym/SmartGym-Major/realtimepose/realtimeposture/app.py', exercise, count]);

  exerciseProcess.stdout.on('data', (data) => {
    console.log(`Python process output: ${data}`);
  });

  exerciseProcess.on('close', (code) => {
    console.log(`Python process exited with code: ${code}`);
  });

  res.json({ message: 'Exercise started' });
});

app.post('/skip-exercise', (req, res) => {
  if (exerciseProcess) {
    exerciseProcess.kill();
    res.json({ message: 'Exercise skipped' });
  } else {
    res.json({ message: 'No active exercise process' });
  }
});

import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)
export {app}