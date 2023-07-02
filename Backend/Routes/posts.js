const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');
const auth = require('../Middleware/auth');


router.post('/add-post',auth, async (req,res)=>{
    const newPost = new Post(req.body);
    try {
      const posts = await newPost.save();
      console.log("request successfully");
      return res.status(200).send(posts);
    } catch(err) {
        console.log("posts error",err);
        return res.status(500).send(err);
    }
});

 router.get('/all-posts',auth,(req,res)=>{
   Post.find((err,posts)=>{
     if(err) return res.status(500).send(err);
     return res.status(200).send(posts);
    })
 })


 module.exports = router