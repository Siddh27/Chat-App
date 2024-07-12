import mongoose from "mongoose"
import dotenv from "dotenv"
const DB_URI = process.env.DB_URI
const DB_NAME = process.env.DB_NAME

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${DB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected!! DB HOST:${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MONGODB connection error",error);
    }
}

export default connectDB