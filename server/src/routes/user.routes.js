import { Router } from "express";
import { loginUser, userRegister } from "../controllers/user.controllers.js";

const router=Router()

router.route('/register').post(userRegister)
router.route('/logins').post(loginUser)

export default router