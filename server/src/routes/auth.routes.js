import { Router } from "express";
import { signup,login,getUserInfo,updateProfile,addProfileImage,removeProfileImage } from "../controllers/Auth.controllers.js";
import { verifyToken } from "../middlewares/Auth.middlewares.js";

import multer from "multer"

const upload = multer({dest:"uploads/profiles/"})

const authRoutes = Router()
authRoutes.post('/signup',signup);
authRoutes.post('/login',login)
authRoutes.get('/user-info',verifyToken,getUserInfo);
authRoutes.post('/update-profile',verifyToken,updateProfile)
authRoutes.post('/add-image',verifyToken,upload.single("profile-image"),addProfileImage);
authRoutes.delete('/remove-profile-image',verifyToken,removeProfileImage);

export default authRoutes;