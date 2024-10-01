import { asyncHandler } from "../utils/asynchronousHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken=async(userId)=>{
  try {
    const user=await User.findById(userId)
    if (!user){
      throw new ApiError(404, 'User not found');
    }
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})
   //  console.log("Tokens generated successfully:", {
   //    accessToken,
   //    refreshToken,
   //  });
    return {accessToken,refreshToken}
  } catch (error) {
     console.error("Error generating tokens: ", error);
     throw new ApiError(500,"Something Went wrong while generating Tokens")
  }
}
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
const loginUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body
   const user=await User.findOne({
      email:email
   })

   // console.log("email",email)
   if(!user){
      throw new ApiError(404,"User not found")
   }

   const passwordCheck=await  user.isPasswordCorrect(password)
   if (!passwordCheck){
      throw new ApiError(401,"Password is wrong")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(
      user._id
    );
   //  console.log('Tokens after generation:', { accessToken, refreshToken });
   if (!accessToken || !refreshToken) {
      throw new ApiError(500, "Failed to generate tokens");
    }
   
   const loggedIn= await User.findById(user._id).select
   ('-password -refreshToken')

   const options={
      httpOnly:true,
      secure:true
   }

   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(
      new ApiResponse(
         200,
         {
            user:accessToken,refreshToken,loggedIn
            
         },
         "User Login Successfully"
      )
   )

})

const logOutUser=asyncHandler(async(req,res)=>{
   await User.findByIdAndUpdate(
      req.user._id,
      {
         $set:{
            refreshToken:undefined
         }
      },
      {
         new:true
      }
   )
   const options={
      httpOnly:true,
      secure:true
   }

   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(
      new ApiResponse(200,{},"User logOut Successfully")
   )
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
   try {
       const incomingRefreshToken=req.cookies.refreshToken || 
       req.body.refreshToken
   
       if(!incomingRefreshToken){
           throw new ApiError(401,"Invalid IncomingRefresh Token")
       }
   
       const decodedToken=jwt.verify(
           incomingRefreshToken,
           process.env.REFRESH_TOKEN_SECRET
       )
   
       const user= await User.findById(decodedToken?._id)
       if(!user){
           throw new ApiError(401,"Unauthorized Token Access")
       }
   
       if(incomingRefreshToken!==user?.refreshToken){
           throw new ApiError(400,"Refresh Token Not Matched")
       }
   
       const options={
           httpOnly:true,
           secure:true
       }
   
       const{accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user._id)
   
       return res
       .status(200)
       .cookie("accessToken",accessToken,options)
       .cookie("refreshToken",newRefreshToken,options)
       .json(
           new ApiResponse(
               200,{
                   accessToken,refreshToken:newRefreshToken
               },
               "Access Token Refreshed"
               
           )
       )
   } catch (error) {
       throw new ApiError(400,error?.message||"Invalid Token access")
   }
})

const updateRecommendExercises=asyncHandler(async(req,res)=>{
   console.log("body",req.body)
   const user=await User.findById(req.user._id)
    if(!user){
      throw new ApiError(401,"user not found")
    }

    if(exerciseData==""){
      throw new ApiError(400,"User exercise not found")
    }

    user.exerciseRecommendation=exerciseData
    await user.save({ validateBeforeSave: false });

    return res
    .status(200)
    .json(
      new ApiResponse(
         200,user,"Recommend Exercise Submit Successfully"
      )
    )
})
export {userRegister,
       loginUser,
       logOutUser,
       generateAccessAndRefreshToken,
       refreshAccessToken,
       updateRecommendExercises}