const express = require('express');
const { userRegistration, login, logout, getOtherUsers } = require('../Controller/user.Controller');
const isAuthenticatedMiddleware = require('../Middlewares/isAuthenticated.middleware');
const router  = express.Router()






router.post("/registerUser", userRegistration)
router.post("/login", login)
router.get("/logout", logout)
router.get("/",isAuthenticatedMiddleware,getOtherUsers)




module.exports = router