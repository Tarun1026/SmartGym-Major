import { asyncHandler } from "../utils/asynchronousHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
const userRegister=asyncHandler(async (req,res)=>{
    const{email,fullName,password}=req.body

    if([fullName,email,password].some((field)=>field?.trim==""))
    {
        throw new ApiError(400,"All field are required")
    }
    if(password.length<6){
        throw new ApiError(400,"Password should be greater than 4")
    }
    const existedUser=await User.findOne({
        email:email
     })
     if (existedUser){
        throw new ApiError(401, "User already exist");
     }
     const createUser=await User.create({
        fullName:fullName.toLowerCase(),
        email,
        password
     })
     if(!createUser){
        throw new ApiError(500, 
            "Something went wrong while registering from our side");
     }

     return res
     .status(200)
     .json(new ApiResponse(
        200,createUser,"User Register Successfully"
     ))
})

export {userRegister}