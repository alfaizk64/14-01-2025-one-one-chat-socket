const express = require('express');
const { sendMessage, getMessage } = require('../Controller/chat.controller');
const isAuthenticatedMiddleware = require('../Middlewares/isAuthenticated.middleware');
const router = express.Router();







router.post("/send/:id",isAuthenticatedMiddleware,sendMessage)
router.get("/:id",isAuthenticatedMiddleware,getMessage)















module.exports =router;