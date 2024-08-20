const { getCartByUserId, clearCart } = require("../repositories/cartRepository");
const { getProductById } = require("../repositories/productRepository");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId){
    const cart = await getCartByUserId(userId)

    
    
    if (!cart) {
        throw new NotFoundError('CART')
    }
    return cart
}

async function modifyCart(userId , productId , shouldAdd = true) {
    const quantityValue = (shouldAdd === true) ? 1 : -1
    const cart = await getCart(userId)
    const product = await getProductById(productId)
    if (!product) {
        throw new NotFoundError('PRODUCT')
    }
    if (!product.inStock && product.quantity <= 0) {
        throw new BadRequestError(['PRODUCT NOT AVAILABLE IN STOCK'])
    }
    let foundProduct = false

    cart.items.forEach(item => {
        
        if (item.product._id == productId) {
            if (shouldAdd) {
                if(product.quantity >=item.quantity + 1)
                item.quantity += quantityValue
                else
                throw new AppError('RIGTH NOW IT IS NOT AVAILABLE AT THIS QUANTITY  , MAY BE IN FUTURE IT IS AVAILABLE' , 404)
            }else {
                if (item.quantity > 0) {
                item.quantity += quantityValue
                if (item.quantity == 0) {
                    cart.items = cart.items.filter(item => item.product._id != productId)
                    foundProduct = true;
                
                    return 
                }
                }              
                  else
                throw new AppError('RIGTH NOW IT IS NOT AVAILABLE AT THIS QUANTITY  , MAY BE IN FUTURE IT IS AVAILABLE' , 404)
            }

            foundProduct = true
        }
    })

   if (!foundProduct) {
       if (shouldAdd) {
        cart.items.push({
            product: productId,
            quantity: 1
        })
       }else throw new NotFoundError('PRODUCT IN THE CART')
   }

   await cart.save()

   await product.save()
 
   return cart;
}

async function clearProductsFromCart(userId) {
    const response = await clearCart(userId)
    return response
}

module.exports = {
    getCart,
    modifyCart ,
    clearProductsFromCart
}