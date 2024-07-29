const express = require("express") 
const { createUser } = require("../controllers/userControllers")

const userRouter = express.Router()
userRouter.post('/' , createUser)


module.exports = userRouter