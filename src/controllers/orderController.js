const { updateOrderStatus } = require('../repositories/orderRepository');
const {createOrder, getAllOrderDetailsById, getAllOrdersCreatedByUser, updateOrder} = require('../services/orderService');
const AppError = require('../utils/appError');
async function createNewOrder(req ,res) {
    try {    console.log("Request Body:", req.body); // Log full body structure
        console.log("User ID:", req.user.id);
        console.log("Address:", req.body.address);
        console.log("Payment Method:", req.body.paymentMethod)
        const address = req.body.address
        const paymentMethod = req.body.paymentMethod
        const order = await createOrder(req.user.id , address , paymentMethod)
        return res.status(201).json({
            success:true ,
            message: 'SUCCESSFULLY CREATED THE ORDER' ,
            error : {},
            data:order            
        })
    } catch (error) {
      
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success : false ,
                message : error.message ,
                error : error ,
                data : {}
            })
        }
        return res.status(500).json({
            success : false ,
            message : 'SOMETHING WENT WRONG' ,
            error : error ,
            data : {error:error}
       
    })
    }
}

async function getAllOrdersByUser(req ,res) {
    try {
        const order = await getAllOrdersCreatedByUser(req.user.id )
        console.log(order);
        
        return res.status(200).json({
            success:true ,
            message: 'SUCCESSFULLY FETCHED THE ORDER' ,
            error : {},
            data: order            
        })
    } catch (error) {
      
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success : false ,
                message : error.message ,
                error : error ,
                data : {}
            })
        }
        return res.status(500).json({
            success : false ,
            message : 'SOMETHING WENT WRONG' ,
            error : error ,
            data : {error:error}
       
    })
    }
}

async function getOrder(req ,res) {
    try {
        const order = await getAllOrderDetailsById(req.params.orderId , req.body.paymentMethod)
        return res.status(200).json({
            success:true ,
            message: 'SUCCESSFULLY CREATED THE ORDER' ,
            error : {},
            data:order            
        })
    } catch (error) {
      
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success : false ,
                message : error.message ,
                error : error ,
                data : {}
            })
        }
        return res.status(500).json({
            success : false ,
            message : 'SOMETHING WENT WRONG' ,
            error : error ,
            data : {error:error}
       
    })
    }
}

async function cancelOrder(req,res) {
    try {
        const order = await updateOrder(req.params.orderId , "CANCELLED")
        return res.status(200).json({
            success:true ,
            message: 'SUCCESSFULLY CANCELLED THE ORDER' ,
            error : {},
            data:order            
        })
    } catch (error) {
      
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success : false ,
                message : error.message ,
                error : error ,
                data : {}
            })
        }
        return res.status(500).json({
            success : false ,
            message : 'SOMETHING WENT WRONG' ,
            error : error ,
            data : {error:error}
       
    })
    }
}
async function changeOrderStatus(req,res) {
    try {
        const order = await updateOrder(req.params.orderId , req.body.status)
        return res.status(200).json({
            success:true ,
            message: 'SUCCESSFULLY CHANGED THE ORDER STATUS' ,
            error : {},
            data:order            
        })
    } catch (error) {
      
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success : false ,
                message : error.message ,
                error : error ,
                data : {}
            })
        }
        return res.status(500).json({
            success : false ,
            message : 'SOMETHING WENT WRONG' ,
            error : error ,
            data : {error:error}
       
    })
    }
}

module.exports = {
    createNewOrder,
    changeOrderStatus,
    cancelOrder,
    getAllOrdersByUser,
    getOrder
}