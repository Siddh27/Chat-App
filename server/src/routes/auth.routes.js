import { Router } from "express";
import { signup,login,getUserInfo } from "../controllers/Auth.controllers.js";
import { verifyToken } from "../middlewares/Auth.middlewares.js";


const authRoutes = Router()
authRoutes.post('/signup',signup);
authRoutes.post('/login',login)
authRoutes.get('/user-info',verifyToken,getUserInfo);



export default authRoutes;