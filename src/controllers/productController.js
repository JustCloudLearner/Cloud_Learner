const Product = require('../schema/productSchema');
const {createProduct, getProductById, deleteProductById} = require('../services/productService');
const AppError = require('../utils/appError');

async function addProduct(req ,res){
try {
    console.log('CREATING PRODUCT');
    
const product = await createProduct({
    productName : req.body.productName , 
    description : req.body.description ,//IF INSTOCK IS NOT DEFINED THEN IT IT WILL BE UNDEFINED
    imagePath : req.file.path ,
    price : req.body.price ,
    category : req.body.category ,//IF CATEGORY IS NOT DEFINED THEN IT IT WILL BE T'S DEFAULT VALUE
    inStock : req.body.inStock //IF INSTOCK IS NOT DEFINED THEN IT IT WILL BE T'S DEFAULT VALUE 
})
return res.status(201).json({
    success : true , 
    message : 'SUCCESSFULLY CREATED THE PRODUCT' , 
    data  : product ,
    error : {}
})
} catch (error) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success : false , 
            message : error.message , 
            data : {} ,
            error : error
        })
    }
 console.log(error);
 return res.status(500).json({
    success : false , 
    message : 'SOMETHING WENT WRONG' , 
    data : {} ,
    error : error
})
}
}

async function getProduct(req , res) {
    try {
      const response = await getProductById(req.params.id)
      return res.status(200).json({
        success : true ,
        message : 'SUCCESSFULLY FETCHED THE PRODUCT' ,
        error : {} ,
        data : response
      })  
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success : false , 
                message : error.message , 
                data : {} ,
                error : error
            })
        }
     console.log(error);
     return res.status(500).json({
        success : false , 
        message : 'SOMETHING WENT WRONG' , 
        data : {} ,
        error : error
    })
    }
}
async function deleteProduct(req , res) {
    try {
      const response = await deleteProductById(req.params.id)
      return res.status(200).json({
        success : true ,
        message : 'SUCCESSFULLY DELETED THE PRODUCT' ,
        error : {} ,
        data : response
      })  
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success : false , 
                message : error.message , 
                data : {} ,
                error : error
            })
        }
     console.log(error);
     return res.status(500).json({
        success : false , 
        message : 'SOMETHING WENT WRONG' , 
        data : {} ,
        error : error
    })
    }
}

module.exports = {
    addProduct ,
    getProduct ,
    deleteProduct
}