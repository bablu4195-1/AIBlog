const express = require('express');
const router = express.Router()

const Comment = require('../Models/Comment');

router.post('/comments',(req,res)=>{
    const newComment = new Comment(req.body);
    newComment.save((err,comment)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send(comment);
    })
});

router.get('/comments',(req,res)=>{
   Comment.find((err,comments)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send(comments);
    });
});

module.exports = router;
