const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    Institute : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true , 
        ref : 'User' ,
        unique : true
    },
    teachers : [
        {
             teacherName : {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'User' , 
            required : true 
        } ,
        totalTeachers : {
            type : Number ,
            required : true ,
            default : 1
        }
        }
    ] 
} , {
    timestamps : true
})

const Cart = mongoose.model('Cart' , cartSchema)

module.exports = Cart