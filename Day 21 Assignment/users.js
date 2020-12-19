
// modules 
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Schema for Users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    country: String
})


// Model for users
const userModel = new mongoose.model('users',userSchema);


// MongoDb Connection
mongoose.connect('mongodb://127.0.0.1:27017/userproducts',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("MongoDb is Connected");
})


// key for password encryption
let salt = "secretkey";
let tokenKey = "tokenkey";



// route for registering the user
router.post('/register',(req,res)=>{

    let user = req.body;
    user.password = crypto.pbkdf2Sync(user.password,salt,1000,64,'sha512').toString('hex');

    let userObj = new userModel(user);
    userObj.save().then(()=>{
        res.send({"message":"User Registered"});
    })
})


// route for logging in the user
router.post('/login', async (req,res)=>{
    
    let userCredentials = req.body;
    userCredentials.password = crypto.pbkdf2Sync(userCredentials.password,salt,1000,64,'sha512').toString('hex');

    let userCount = await userModel.find(userCredentials).countDocuments();

    if(userCount == 1){
        
        // generating the token
        jwt.sign(userCredentials,tokenKey,(err,token)=>{

            if(err == null){
                res.send({token});
            }
            else{
                res.send({"message":"Some problem try after some time"});
            }
        })
    }
    else{
        res.send({"message":"Wrong Username or Password"});
    }
    
})


module.exports = router;