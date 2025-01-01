const express = require('express');
const serverconfig = require('./config/serverconfig.js');
const connectDB = require('./config/dbConfig');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user_route.js');
const authRouter = require('./routes/auth_route')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', (req, res) => {
    console.log(req.body); // Log the request body
    res.send('Data received');
});

app.use('/user', userRouter);
app.use('/auth',authRouter);
app.listen(serverconfig.PORT, async () => {
    await connectDB();
    console.log(`SERVER GOT STARTED ON PORT NO. ${serverconfig.PORT}\n http://localhost:${serverconfig.PORT}`);
}); 