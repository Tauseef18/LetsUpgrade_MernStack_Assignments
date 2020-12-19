
// importing predefined modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// including custom routers modules
const userRouter = require('./users');
const productRouter = require('./product'); 


// starting the express application
const app = express();


// middlewares
app.use(express.json());
app.use(cors());


// custom routes middlewares
app.use('/user',userRouter);
app.use('/product',productRouter);


// starting the server
app.listen(3000,()=>{
    console.log("Server is Running");
})


