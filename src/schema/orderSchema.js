const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' , 
        required : true                             
    },
    items : [
        {
             product : {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'Product' , 
            required : true 
        } ,
        quantity : {
            type : Number ,
            required : true ,
            default : 1
        }
        }
    ] ,
    totalPrice: {
        type : Number ,
        required : true
    } ,
    status: {
        type : String , 
        default : 'ORDERED' ,
        enum : ['ORDERED' , 'CANCELLED' ,  'DELIVERED' , 'PROCESSING' , 'OUT_FOR_DELEVERY']
    } ,
    address: {
        type: String ,
        // minLength : [10 , 'ADDRESS SHOULD BE ATLEAST 10 CHARACTERS LONG'] ,
        required: true
    } ,
    paymentMethod: {
        type : String , 
        enum : ['ONLINE' , 'CASH'] ,
        default : 'CASH'
    }

} , {
    timestamps : true
})

const Order = mongoose.model('Order' , orderSchema)

module.exports = Order