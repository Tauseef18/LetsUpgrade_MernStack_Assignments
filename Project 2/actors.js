
//importing modules
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// Schema for actors
const actorSchema = mongoose.Schema({
    "name":String,
    "age":Number,
    "country":String,
    "moviesCount":Number
})

// Model for actors
const actorModel = new mongoose.model('actors',actorSchema);



// routes for actors

// getting all the actors
router.get('/v2/', async (req,res)=>{

    let actors = await actorModel.find();
    res.send({actors});
})


// getting a single actor wrt id
router.get('/v2/:id', async (req,res)=>{

    let id = req.params.id;

    let actor = await actorModel.findById(id);
    res.send({actor});
})


// creating an actor route
router.post('/v2/create',(req,res)=>{

    let actor = req.body;

    let actorObj = new actorModel(actor);
    actorObj.save().then(()=>{
        res.send({"message":"Actor Created"});
    })
})


// Updating the actor
router.put('/v2/update/:id',(req,res)=>{

    let id = req.params.id;

    let actor = req.body;

    actorModel.updateOne({"_id":id},actor).then(()=>{
        res.send({"message":"Actor Updated"})
    })
})


// Deleting the actor
router.delete('/v2/delete/:id',(req,res)=>{

    let id = req.params.id;

    actorModel.deleteOne({"_id":id}).then(()=>{
        res.send({"message":"Actor Deleted"});
    })
})


module.exports = router;
