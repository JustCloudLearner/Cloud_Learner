const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName : {
        type : String ,
        required : [true , "PRODUCT NAME IS REQUIRED , PLEASE FILL IT  "] ,
        trim : true ,
        minLength : [2 , 'IT SHOULD BE ATLEAST 2 CHARACTERS LONG']  ,
    } ,
    description : {
        type : String ,
        minLength : 10 ,
        trim : true 
    } ,
    productImage : {
        type : String ,
        required : true ,
        default : 'https://bit.ly/4cnsaNK' },
    price : {
        type : Number ,
        required : [true , 'PRODUCT PRICE IS REQUIRED , PLEASE FILL IT'] ,
    } ,
    category : {
        type : String ,
        enum : ['veg' , 'non-veg' , 'drinks' , 'sides' , 'food'] ,
        default : 'food'
    } ,
    inStock : {
        type : Boolean ,
        required : [true , 'IN STOCK STATUS IS REQUIRED'] ,
        default : true
    }
}, {
    timestamps : true
}) 

const Product = mongoose.model('Product' , productSchema)
module.exports = Product