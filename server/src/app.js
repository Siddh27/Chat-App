import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"

const app = express()

const corsOptions = {
    origin:[process.env.origin],
    credentials:true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


export {app}