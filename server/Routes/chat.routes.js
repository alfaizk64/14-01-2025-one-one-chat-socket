import express from 'express'
import { sendMessage, getMessage } from '../Controller/chat.controller.js'
import isAuthenticatedMiddleware from '../Middlewares/isAuthenticated.middleware.js'
const router = express.Router();







router.post("/send/:id",isAuthenticatedMiddleware,sendMessage)
router.get("/:id",isAuthenticatedMiddleware,getMessage)


export default router