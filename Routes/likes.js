const express = require('express');
const router = express.Router();

const Like = require('../Models/Like');

router.post('/',(req,res)=>{
    const newLike = new Like(req.body);
    newLike.save((err,like)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send(like);
        });
});

 router.get('/',(req,res)=>{
    Like.find((err,likes)=>{
     if(err) return res.status(500).send(err);
     return res.status(200).send(likes);
    })
 })

 
 module.exports = router;