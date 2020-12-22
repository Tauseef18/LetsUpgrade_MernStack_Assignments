
//importing modules
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Schema for movies
const movieSchema = new mongoose.Schema({
    "name": String,
    "universe": String,
    "genre": [String],
    "year": Number,
    "rating": Number,
    "revenue": Number,
    "poster": String,
    "actors": [{type:mongoose.Schema.Types.ObjectId,ref:'actors'}]
})

// Model for movies
const movieModel = new mongoose.model('movies',movieSchema);

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/movies2',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to MongoDb");
})



// routes for movies

// getting all the movies
router.get('/v2/', async (req,res)=>{

    let movies = await movieModel.find().populate('actors');
    res.send({movies});
})


// getting a single movie wrt id
router.get('/v2/:id', async (req,res)=>{

    let id = req.params.id;

    let movie = await movieModel.findById(id).populate('actors');
    res.send({movie});
})


//creating a movie
router.post('/v2/create',(req,res)=>{

    let movie = req.body;

    let movieObj = new movieModel(movie);
    movieObj.save().then(()=>{
        res.send({"message":"Movie Created"});
    })

})


// Updating the movie
router.put('/v2/update/:id',(req,res)=>{

    let id = req.params.id;

    let movie = req.body;

    movieModel.updateOne({"_id":id},movie).then(()=>{
        res.send({"message":"Movie Updated"});
    })
})


// Deleting the movie
router.delete('/v2/delete/:id',(req,res)=>{

    let id = req.params.id;

    movieModel.deleteOne({"_id":id}).then(()=>{
        res.send({"message":"Movie Deleted"});
    })
})


module.exports = router;