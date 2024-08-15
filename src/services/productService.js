const cloudinary = require('../config/cloudinaryConfig.js')
const productRepository = require('../repositories/productRepository.js')
const fs = require('fs/promises')
const InternalServerError = require('../utils/internalServarError.js')
const NotFoundError = require('../utils/notFoundError.js')
async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath
    if (imagePath) {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(imagePath) 
    var productImage = cloudinaryResponse.secure_url    
  await fs.unlink(imagePath)   
  } catch (error) {
    console.log(error);
    
    throw new InternalServerError()
  }
    }
    const product  = await productRepository.createProduct({
        ...productDetails ,
        productImage : productImage
    })
    return product
}

async function getProductById(productId) {
    const response = await productRepository.getProductById(productId)
    if(!response){
        throw new NotFoundError('PRODUCT')
    }
    return response
}
async function deleteProductById(productId) {
    const response = await productRepository.deleteProductById(productId)
    if(!response){
        throw new NotFoundError('PRODUCT')
    }
    return response
}


module.exports = {createProduct , getProductById , deleteProductById}