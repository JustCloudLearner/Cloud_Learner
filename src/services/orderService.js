const { clearCart } = require("../repositories/cartRepository")
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepository")
const BadRequestError = require("../utils/badRequestError")
const InternalServerError = require("../utils/internalServarError")
const NotFoundError = require("../utils/notFoundError")
const { getCartByUserId } = require("../repositories/cartRepository")
const {findUser} = require('../repositories/userRepository.js')
async function createOrder(userId, paymentMethod) { 
    const cart = await getCartByUserId(userId)
    const user = await findUser({_id : cart.user})
   console.log(cart);
   
    console.log(user);
    
   
    if(!cart){
        throw new NotFoundError('Cart')
    }
    if (cart.items.length === 0) {
        throw new BadRequestError(['ITEMS QUANTITY === 0 ; res.message("ADD ITMES THEN PLACE ORDER ")'])
    }
    const orderObject = {}
    orderObject.user = cart.user
    orderObject.items = cart.items.map(cartItem => {
        return {product: cartItem.product._id , quantity : cartItem.quantity}
    })
    // orderObject.status = 'ORDERED'
    orderObject.totalPrice = 0
    orderObject.paymentMethod = paymentMethod
    orderObject.address = user.address 
     cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price
     });
        
     const order = await createNewOrder(orderObject)
     console.log('ORDER OBJECT :' , orderObject);
     console.log('ORDER :' , order);
    
   if(!order){
        throw new InternalServerError()
     }
     await clearCart(userId)
    return order
}


async function getAllOrderDetailsById(orderId) {
    const order = await getOrderById(orderId)
    if (!order) {
        throw new NotFoundError('ORDERS')
    }
    return order
}

async function updateOrder(orderId , status) {
    const order = await updateOrderStatus(orderId , status)
    if (!order) {
        throw new NotFoundError('ORDERS')
    }
    return order
    
}

async function getAllOrdersCreatedByUser(userId) {
    const orders = await getOrdersByUserId(userId)
    if(!orders){
        throw new NotFoundError('Orders')
    }
    return orders
}
 
module.exports = {
    createOrder,
    getAllOrderDetailsById,
    updateOrder ,
    getAllOrdersCreatedByUser
}