const express = require("express")
const { getCartById } = require("../controllers/cartController")

const cartRouter = express.Router()
cartRoute.get(":id" , getCartById)

module.exports = cartRouter