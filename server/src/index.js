import dbConnection from "./db/database.js";
import dotenv from "dotenv"
import {app} from "./app.js";
import cors from 'cors';

dotenv.config({
    path:"./.env"
})


app.use(cors());

dbConnection()
.then(()=>{

    app.listen(process.env.PORT||9000,()=>{
        console.log(`Port running on ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection error",err)
})
