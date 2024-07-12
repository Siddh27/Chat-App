import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server listening at ${process.env.PORT}`);
    })    
})
.catch((error)=>{
    console.log("MONGODB connection failed!!!",error);
})
