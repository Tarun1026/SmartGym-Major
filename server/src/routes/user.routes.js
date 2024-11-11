import { Router } from "express";
import { loginUser, 
         logOutUser, 
         refreshAccessToken, 
         exerciseRecommendation,
         updateRecommendExercises, 
         userRegister, 
         getUserDetails,
         getWorkoutSummary} 
         from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { submitExerciseData } from "../controllers/exercise_controller.js";
const router=Router()

router.route('/register').post(userRegister)
router.route('/logins').post(loginUser)
router.route('/logOut').post(verifyJWT,logOutUser)
router.route('/refresh-Token').post(refreshAccessToken)
router.route('/get-recommendations').get(verifyJWT,exerciseRecommendation)
router.route('/recommend-exercise').post(verifyJWT,updateRecommendExercises)
router.route('/calorie').post(verifyJWT,submitExerciseData)
router.route('/current-user-details').get(verifyJWT,getUserDetails)
router.route('/user-workout-summary').get(verifyJWT,getWorkoutSummary)
export default router