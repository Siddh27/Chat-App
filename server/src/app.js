import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import authRoutes from "./routes/auth.routes.js";

const app = express()

const corsOptions = {
    origin:[process.env.origin],
    credentials:true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/auth',authRoutes)

export {app}