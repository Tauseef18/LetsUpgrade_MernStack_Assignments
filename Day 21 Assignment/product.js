
// modules 
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('./verifyToken');

// Schema for products
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    rating: Number,
    description: String
})


// Model for products
const productModel = new mongoose.model('products',productSchema);

// dummy response
let dummyRes = {"message":"route test successfull !!"};



// routes

// for getting all the products
router.get('/',verifyToken, async(req,res)=>{

    let products = await productModel.find();
    res.send({products});

})

// for getting a single product
router.get('/:id',verifyToken, async(req,res)=>{

    let id = req.params.id;

    let product = await productModel.findById(id);
    res.send({product});

})


// for creating a product
router.post('/createproduct', verifyToken, (req,res)=>{

    let product = req.body;

    let productObj = new productModel(product);
    productObj.save().then(()=>{
        res.send({"message":"Product Created"});
    })

})

module.exports = router;