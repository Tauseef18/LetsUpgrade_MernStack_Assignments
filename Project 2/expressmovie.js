
// importing modules and packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// including custom router modules
const moviesRouter = require('./movies');
const actorsRouter = require('./actors');


// starting the express application
const app = express();

// middlewares
app.use(express.json());
app.use(cors());


// cutsom routes middlewares
app.use('/movie',moviesRouter);
app.use('/actor',actorsRouter);


// starting the server
app.listen(3000,()=>{
    console.log("Sever is Running");
})