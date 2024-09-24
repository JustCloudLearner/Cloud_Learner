const Order = require("../schema/orderSchema");
const InternalServerError = require("../utils/internalServarError");

async function createNewOrder(orderDetails){
    try {
        const order = await Order.create(orderDetails)
        console.log(order);
        
        return order
    } catch (error) { 
        console.log(error);
          
          if(error.name === 'ValidationError'){
        const errorMessageList =  Object.keys(error.errors).map((property)=> { 
         return   property , error.errors[property].message
            
        })  
      throw new InternalServerError(errorMessageList)
    }
        
    console.log(error)
        throw new InternalServerError(errorMessageList)
    }
}

async function getOrdersByUserId(userId) {
    try {
        const orders = await Order.find({user: userId}).populate('items.product')
        console.log(`ORDER : ${orders}`);
        
        return orders
    } catch (error) {
        console.log(error);
        throw new InternalServerError()
        
    }
}

async function getOrderById(orderId) {
    try {
        const order = await Order.findById(orderId)
        return order
    } catch (error) {
        console.log(error);
        throw new InternalServerError()
        
    }
}

async function updateOrderStatus(orderId , status) {
    try {
        const order = await Order.findByIdAndUpdate(orderId , {status: status} , {new : true})
        return order
    } catch (error) {
        console.log(error);
        throw new InternalServerError()
    }
}

module.exports = {
    createNewOrder ,
    getOrderById ,
    getOrdersByUserId ,
    updateOrderStatus
}