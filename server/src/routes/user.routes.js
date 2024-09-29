import { Router } from "express";
import { loginUser, 
         logOutUser, 
         refreshAccessToken, 
         userRegister } 
         from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router=Router()

router.route('/register').post(userRegister)
router.route('/logins').post(loginUser)
router.route('logOut').post(verifyJWT,logOutUser)
router.route('refresh-Token').post(refreshAccessToken)
export default router