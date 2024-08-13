const Product = require('../schema/productSchema');
const {createProduct} = require('../services/productService')

async function addProduct(req ,res){
try {
    
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
 console.log(error);
    return res.status(error.statusCode).json({
        success : false , 
        message : error.reason , 
        data : {} ,
        error : error
    })
}
}


module.exports = addProduct