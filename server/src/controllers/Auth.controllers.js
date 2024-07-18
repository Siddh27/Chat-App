import User from "../models/user.models.js"
import jwt from "jsonwebtoken"
import { compare } from "bcrypt"
import fs, { unlinkSync } from 'fs'


const signup = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json("Email and Password both are required")
        }
        const isAlready  = await User.findOne({
            email
        })
        if(isAlready){
            return res.status(409).json("User already exists")
        }
        const options = {
            expiresIn: '1d' // 1 days
        };
        const user = await User.create({email,password});
        const userId = user._id;
        const token = jwt.sign({email,userId},process.env.JWT_SECRET_KEY,options)
        res.cookie("token",token,{
            expires:new Date(Date.now() + 24 * 60 * 60 * 1000),// 1 day from now
            secure:true,
            sameSite:"None",
            httpOnly:true
        })
        return res.status(201).json({
            user:{
                id:user._id,
                email:user.email,
                profileSetup:user.profileSetup
            }
        })
          
    } catch (error) {
        console.log(error);
        res.status(500).json("Error in signup!")
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json("Email and Password both are required")
        }
        const isAlready  = await User.findOne({
            email
        })
        if(!isAlready){
            return res.status(409).json("User does not exist with this email")
        }
        const options = {
            expiresIn: '1d' // 1 days
        };
        const user = await User.findOne({email});
        const validPassword = await compare(password,user.password);
        if(!validPassword){
            return res.status(401).json("Wrong password,pls try again")
        }
        const userId = user._id;
        const token = jwt.sign({email,userId},process.env.JWT_SECRET_KEY,options)
        res.cookie("token",token,{
            expires:new Date(Date.now() + 24 * 60 * 60 * 1000),// 1 day from now
            secure:true,
            sameSite:"None",
            httpOnly:true
        })
        return res.status(200).json({
            user:{
                id:user._id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                color:user.color
            }
        })
          
    } catch (error) {
        console.log(error);
        res.status(500).json("Error in signup!")
    }
}

const getUserInfo = async(req,res)=>{
    try {
        const userData = await User.findById(req.userId);
        if(!userData){
            return res.status(409).json("User does not exist with this id")
        }
        return res.status(200).json({
                id:userData._id,
                email:userData.email,
                profileSetup:userData.profileSetup,
                firstName:userData.firstName,
                lastName:userData.lastName,
                image:userData.image,
                color:userData.color
        })
        
    } catch (error) {
        
    }
}

const updateProfile = async(req,res)=>{
    try {
        const userId = req.userId
        const {firstName,lastName,color} = req.body;
        if(!firstName || !lastName){
            return res.status(400).json("Firstname and lastName is required");
        } 
        const userData = await User.findByIdAndUpdate(userId,{
            firstName,
            lastName,
            color,
            profileSetup:true
        },{new:true,runValidators:true})
        return res.status(200).json({
                id:userData._id,
                email:userData.email,
                profileSetup:userData.profileSetup,
                firstName:userData.firstName,
                lastName:userData.lastName,
                image:userData.image,
                color:userData.color
        })
    } catch (error) {
        console.log(error);
    }
}

const addProfileImage = async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json("file is required!");
        }
        const date = Date.now();
        let fileName = "uploads/profiles/"+date+req.file.originalname;
        fs.renameSync(req.file.path,fileName)

        const updatedUser = await User.findByIdAndUpdate(req.userId,{
            image:fileName},{new:true,runValidators:true})

        return res.status(200).json({
            image:updatedUser.image
        })

    } catch (error) {
        console.log(error);
    }
}

const removeProfileImage = async(req,res)=>{
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json("User not found" )
        }
        if(user.image){
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        return res.status(200).json("profile image removed successfully")
    } catch (error) {
        console.log(error);
    }
}

const logout = async(req,res)=>{
    try {
        res.cookie("token","",{maxAge:1,secure:true,sameSite:"None"});
        return res.status(200).json("Logout Successfull");
    } catch (error) {
        console.log(error);
    }
}

export {signup,login,getUserInfo,updateProfile,addProfileImage,removeProfileImage,logout}