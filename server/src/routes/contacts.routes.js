import { Router } from "express";
import {verifyToken} from "../middlewares/Auth.middlewares.js"
import {searchContacts} from "../controllers/Contacts.controllers.js"
const contactsRoutes = Router();

contactsRoutes.post("/search",verifyToken,searchContacts)

export default contactsRoutes