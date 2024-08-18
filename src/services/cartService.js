const { getCartByUserId } = require("../repositories/cartRepository");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId){
    const cart = await getCartByUserId(userId)

    
    
    if (!cart) {
        throw new NotFoundError('CART')
    }
    return cart
}
module.exports = {
    getCart
}