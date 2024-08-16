const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema ({
    firstName : {
        type : String ,
        required : [true , "FIRST NAME IS REQUIRED , PLEASE FILL IT"] ,
        minlength : [5 , 'FIRST NAME SHOULD BE 5 CHARACHTER LONG'] ,
        lowercase : true , 
        trim : true ,
        maxLength : [50 , "FIRST NAME NOT SHOULD BE MORE THAN 50 CHARACTERS LONG "]
    } ,
    lastName : {
        type : String ,
        required : [true , "FIRST NAME IS REQUIRED , PLEASE FILL IT"] ,
        minlength : [5 , 'FIRST NAME SHOULD BE 5 CHARACHTER LONG'] ,
        lowercase : true , 
        trim : true ,
        maxLength : [50 , "FIRST NAME NOT SHOULD BE MORE THAN 50 CHARACTERS LONG "]
    } ,
    mobileNumber : {
        type : String , 
        trim : true ,
        minlength : [10 , 'PHONE NO. SHOULD 10 DIGITS LONG'],
        maxlength : [10 , 'PHONE NO. SHOULD 10 DIGITS LONG'],
        unique : [true , "PHONE NO. IS ALREADY IN USE , TRY TO LOGIN"] ,
        required : [true , 'PHONE NO. REQUIRED']
    } ,
    email : {
        type : String ,
        trim : true , 
        required : [true , 'EMAIL IS REQUIRED'] ,
        unique : [true , 'EMAIL IS ALREADY IN USE , TRY TO LOGIN'] ,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String ,
        required: [true , 'PLEASE FILL OUT PASSWORD'] ,
        minlength : [6 , 'PASSWORD SHOULD 6 CHARACTERS LONG , WITH  MIX OF CAPITAL ,SMALL , SPECIAL CHARACTERS AND NUMBERS']
    } ,
    role :{
        type: String ,
        enum : ["USER" , "ADMIN"] ,
        default : "USER"
    }
} , {
    timestamps : true
})


userSchema.pre('save' , async function () {
    const hashedPassword =  await bcrypt.hash(this.password , 10)
    this.password = hashedPassword
    
})

const User = mongoose.model("User" , userSchema)

module.exports = User