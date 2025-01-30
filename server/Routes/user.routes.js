import express from 'express'
import { userRegistration, login, logout, getOtherUsers } from '../Controller/user.Controller.js'
import isAuthenticatedMiddleware from '../Middlewares/isAuthenticated.middleware.js';
const router  = express.Router()






router.post("/registerUser", userRegistration)
router.post("/login", login)
router.get("/logout", logout)
router.get("/",isAuthenticatedMiddleware,getOtherUsers)




export default router