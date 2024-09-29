import { dbName } from "../constant.js";
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const dbConnection=async()=>{
    try {
        const connectionInstance=await mongoose.connect(
            `${process.env.MONGODB_URL}/${dbName}`
        )
        console.log("Mongodb connected",connectionInstance.connection.host)
    } catch (error) {
        console.log("mongoDb connection failed",error)
        process.exit(1)
    }
}

export default dbConnection