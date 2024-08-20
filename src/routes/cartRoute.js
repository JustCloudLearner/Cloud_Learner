const express = require("express")
const { getCartByUser,  modifyProductTocart } = require("../controllers/cartController")
const { isLoggedIn } = require("../validation/authValidator")

const cartRouter = express.Router()
cartRouter.get("/" , isLoggedIn ,  getCartByUser)
cartRouter.post("/:operation/:productId" , isLoggedIn , modifyProductTocart)

module.exports = cartRouter