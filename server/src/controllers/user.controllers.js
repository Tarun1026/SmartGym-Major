import { asyncHandler } from "../utils/asynchronousHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ExerciseData } from "../models/exercisedata.model.js";

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
console.log("checking password");
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
  console.log("user find");
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

const exerciseRecommendation = asyncHandler(async (req, res) => {
 
   const user = await User.findById(req.user._id);
   if (!user) {
       res.status(404);
       throw new Error('User not found');
   }
   res.status(200).json(user.exerciseRecommendation);
});
const updateRecommendExercises=asyncHandler(async(req,res)=>{
   
   const {result,bmi}=req.body
   console.log("body",req.body)
   console.log("id",req.user._id)
   console.log("res",result)
   const user=await User.findById(req.user._id)
    if(!user){
      throw new ApiError(401,"user not found")
    }

    if (!result) {
      throw new ApiError(400, "User exercise not found");
  }

  console.log("Before update:", user.exerciseRecommendation);
  user.exerciseRecommendation = result;
  user.bmi=bmi;
  await user.save({ validateBeforeSave: false });
  console.log("After update:", user.exerciseRecommendation);
  
    console.log("user",user)
    return res
    .status(200)
    .json(
      new ApiResponse(
         200,user,"Recommend Exercise Submit Successfully"
      )
    )
})

const getUserDetails=asyncHandler(async(req,res)=>{
   // console.log("req",req.user)
   // console.log("call")
   if (!req.user) {
       return res.status(404).json({ message: "User not found" });
     }
   res.status(200)
   .json(
     new ApiResponse(
       200,req.user,"Current User Fetched"
     )
   )
 })

 const getWorkoutSummary = asyncHandler(async (req, res) => {
   const id = req.user._id;
   const user = await ExerciseData.findOne({ userId: id });

   if (!user) {
      return res.status(200).json(
         new ApiResponse(201, "No workout summary")
      );
   } else {
      
      const workoutDetails = await ExerciseData.aggregate([
         {
            $match: { userId: id }
         },
         {
            $lookup: {
               from: "exercisedatas",
               localField: "userId",
               foreignField: "userId",
               as: "workoutSummary"
            }
         },
         {
            $project: {
               _id: 0,
               userId: 1,
               workoutSummary: 1
            }
         }
      ]);

      // Calculate totals for calories, time, and workout count
      const totalData = await ExerciseData.aggregate([
         {
             $match: { userId: id }
         },
         {
             $group: {
                 _id: "$userId",
                 totalCaloriesBurned: { $sum: "$caloriesBurned" },
                 totalTimeTaken: { $sum: "$timeTaken" },
                 totalWorkouts: { $sum: "$workout" }
             }
         },
         {
             $project: {
                 _id: 0,
                 userId: "$_id",
                 totalCaloriesBurned: 1,
                 totalTimeTaken: 1,
                 totalWorkouts: 1
             }
         }
     ]);

      if (totalData.length === 0 || workoutDetails.length === 0) {
         throw new ApiError(401, "Failed fetching workout summary");
      }

      // Combine workout details and total data into a single response object
      const responseData = {
         userId: id,
         workoutSummary: workoutDetails[0].workoutSummary,
         totalCaloriesBurned: totalData[0].totalCaloriesBurned,
         totalTimeTaken: totalData[0].totalTimeTaken,
         totalWorkouts: totalData[0].totalWorkouts
      };

      return res.status(200).json(
         new ApiResponse(200, responseData, "Sent workout summary")
      );
   }
});




export {userRegister,
       loginUser,
       logOutUser,
       generateAccessAndRefreshToken,
       refreshAccessToken,
       exerciseRecommendation,
       updateRecommendExercises,
      getUserDetails,
   getWorkoutSummary}