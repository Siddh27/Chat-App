import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import authRoutes from "./routes/auth.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";
const app = express()

const corsOptions = {
    origin:[process.env.origin],
    credentials:true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/contacts',contactsRoutes)

app.use("/uploads/profiles/",express.static("uploads/profiles/"))

export {app}