const express = require('express');
const router = express.Router();

const Like = require('../Models/Like');

router.post('/',async (req,res)=>{
    // const newLike = new Like(req.body);
    // newLike.save((err,like)=>{
    //     if(err) return res.status(500).send(err);
    //     return res.status(200).send(like);
    //     });
    const newLike = new Like(req.body);
    try {
      const like = await newLike.save();
      console.log("request successfully executed");
      return res.status(200).send(like);
    } catch(err) {
     console.log("like",err);
     return res.status(500).send(err);
    }
});

 router.get('/',(req,res)=>{
    Like.find((err,likes)=>{
     if(err) return res.status(500).send(err);
     return res.status(200).send(likes);
    })
 })

 
 module.exports = router;