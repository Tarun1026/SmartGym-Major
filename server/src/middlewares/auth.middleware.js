import { asyncHandler } from "../utils/asynchronousHandler.js";
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        console.log("verifyJWT")
        const Token=req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ","")
    
        if(!Token){
            throw new ApiError(401,"Invalid Incoming Token")
        }
    
        const decodedToken=jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
        if (!decodedToken){
            throw new ApiError(400,"Invalid Token Access")
        }
        const user=await User.findById(decodedToken?._id).select
        ("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401,"Invalid Access")
        }
    
        req.user=user
        console.log("verifyJWT",req.user)
        next()
    } catch (error) {
        throw new ApiError(400,error?.message||"Invalid access")
    }
})

export default verifyJWT