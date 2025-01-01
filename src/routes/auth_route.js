const express = require("express") 
const { login, logout } = require("../controllers/auth_controller")

const authRouter = express.Router()
authRouter.post('/login' , login)
authRouter.post('/logout' , logout)

module.exports = authRouter