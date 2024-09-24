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

module.exports = {
    createNewOrder
}