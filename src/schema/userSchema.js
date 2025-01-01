const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema ({
    fullName : {
        type : String ,
        required : [true , " NAME IS REQUIRED , PLEASE FILL IT"] ,
        trim : true
    } 
   ,

    email : {
        type : String ,
        trim : true , 
        required : [true , 'EMAIL IS REQUIRED'] ,
        unique : [true , 'EMAIL IS ALREADY IN USE , TRY TO LOGIN'] ,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique : [true , 'EMAIL IS ALREADY IN USE , TRY TO LOGIN']
    },
    password : {
        type : String ,
        required: [true , 'PLEASE FILL OUT PASSWORD'] ,
        minlength : [6 , 'PASSWORD SHOULD 6 CHARACTERS LONG , WITH  MIX OF CAPITAL ,SMALL , SPECIAL CHARACTERS AND NUMBERS ...']
    },
    admin : {
        type : String ,
        default : 'USER',
        enum : ['USER' , 'ADMIN']
    },
    role : {
        required : [true , 'ROLE IS REQUIRED'] ,
        type : String ,
        default : 'STUDENT',
        enum : ['STUDENT' , 'TEACHER' , 'INSTITUTION']
    },
    verified : {
        type : Boolean ,
        default : false,
        enum : [true , false]
    },
 
} , {
    timestamps : true
})

userSchema.pre('save' , async function () {
    const hashedPassword =  await bcrypt.hash(this.password , 10)
    this.password = hashedPassword
    
})
const User = mongoose.model("User" , userSchema)

module.exports = User