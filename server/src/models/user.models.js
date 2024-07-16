import mongoose from "mongoose";
import {genSalt,hash} from "bcrypt"
const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:['Email is Required'],
        unique:true
    },
    password:{
        type:String,
        type:String,
        required:[true,"Password is requried"]
    },
    firstName:{
        type:String,
        requried:false,
    },
    lastName:{
        type:String,
        requried:false,
    },
    image:{
        type:String,
        required:false,
    },
    color:{
        type:Number,
        required:false
    },
    profileSetup:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password,salt);
    next();
})

const User = mongoose.model('User',userSchema)

export default User;