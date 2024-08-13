const cloudinary = require('../config/cloudinaryConfig.js')
const productRepository = require('../repositories/productRepository.js')
const fs = require('fs/promises')
async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath
    if (imagePath) {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(imagePath) 
    var productImage = cloudinaryResponse.secure_url    
  await fs.unlink(imagePath)   

  } catch (error) {
    console.log(error);
    
    throw {reason : "NOT ABLE TO CREATE PRODUCT" , statusCode : 500}
  }
    }
    const product  = await productRepository.createProduct({
        ...productDetails ,
        productImage : productImage
    })
    if (!product) {
        throw {reason : "NOT ABLE TO CREATE PRODUCT" , statusCode : 500}
    }
    return product
}



module.exports = {createProduct}