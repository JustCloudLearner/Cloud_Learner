const express = require('express')
const serverconfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const authRouter = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const { isLoggedIn } = require('./validation/authValidator')
const uploader = require('./middlewares/multerMiddleware')
const cloudinary = require('./config/cloudinaryConfig')
const fs = require('fs/promises')
const productRouter = require('./routes/productRoute')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use('/users' , userRouter)
app.use("/carts" , cartRouter)
app.use('/auth' , authRouter)
app.use('/products' , productRouter)


app.get('/ping' , isLoggedIn , (req , res)=>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message : 'pong'})
})

app.post('/photo' , uploader.single('incomingFile') , async (req ,res)=>{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
   console.log(`RESULT FROM CLOUDINARY : `, result);
  await fs.unlink(req.file.path)   
    return res.json({message : "OK"})
})

app.listen(serverconfig.PORT , async ()=>{
 await connectDB()    
 console.log(`SERVER GOT STARTED ON PORT NO. ${serverconfig.PORT}`);
  
})