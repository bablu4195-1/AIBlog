const express = require('express');
const router = express.Router();

const Post = require('../Models/Post');


router.post('/',(req,res)=>{
    const newLike = new Post(req.body);
    newLike.save((err,like)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send(like);
        });
});

 router.get('/',(req,res)=>{
   Post.find((err,likes)=>{
     if(err) return res.status(500).send(err);
     return res.status(200).send(likes);
    })
 })


 module.exports = router