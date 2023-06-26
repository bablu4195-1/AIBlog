const express = require('express');
const router = express.Router();
const Like = require('../Models/Like');
const auth = require('../Middleware/auth');

router.post('/',auth,async (req,res)=>{
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
     console.log("post like error",err);
     return res.status(500).send(err);
    }
});

 router.get('/', auth,async(req,res)=>{
     try {
      const likes = await Like.find();
      console.log("request successfully executed");
      return res.status(200).send(likes); 
  } catch(err) {
    console.log("get like error");
    return res.status(500).send(err);
  }
 })

 
 module.exports = router;