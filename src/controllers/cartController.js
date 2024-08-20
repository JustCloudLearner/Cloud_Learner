const { getCart, modifyCart, clearProductsFromCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req , res) {
    try {
        const cart = await getCart(req.user.id)
        
        
        return res.status(200).json({
            success : true ,
            message : "SUCCESSFULLY FETCHED THE CART" ,
            error : {} ,
            data : cart
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
            data : {}
       
    })
}}
async function modifyProductTocart(req , res) {
    try {
        const cart = await modifyCart(req.user.id , req.params.productId, req.params.operation === 'add')
        
        
        return res.status(200).json({
            success : true ,
            message : "SUCCESSFULLY ADDED PRODUCT TO THE CART" ,
            error : {} ,
            data : cart
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
            data : {}
       
    })
}}

async function clearCartById(req , res){
    try {
        const cart = await clearProductsFromCart(req.user.id)
        
        
        return res.status(200).json({
            success : true ,
            message : "SUCCESSFULLY CLEARED ALL PRODUCT FROM THE CART" ,
            error : {} ,
            data : cart
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
            data : {}
       
    })
}
}

module.exports = {
    getCartByUser ,
     modifyProductTocart ,
     clearCartById
}