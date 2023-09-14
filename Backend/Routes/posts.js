const http = require('http');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Post = require('../Models/Post');
const auth = require('../Middleware/auth');
const User = require('../Models/User');
const Comment =  require('../Models/Comment');
const crypto = require('crypto');
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
});




function sign(queryString) {
    return crypto.createHmac('sha256', process.env.BINANCE_API_SECRET).update(queryString).digest('hex');
  }
router.post('/add-post', auth, async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const posts = await newPost.save();
        console.log("request successfully");
        return res.status(200).send(posts);
    } catch (err) {
        console.log("posts error", err);
        return res.status(500).send(err);
    }
});

router.get('/reddit-posts',auth, async (req,res) => {
    try{
        const url = await axios.get('https://www.reddit.com/r/Angular2.json');
            const data = url.data;
            return res.status(200).send(data);
    } catch(error){
        console.log("reddit api",error);
        return res.status(500).send(error);
    }
});

router.patch('/update-post/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //update the post with the new data
        post.title = req.body.title;
        post.description = req.body.description;
        post.author = req.body.author;
        //present date
        post.date = Date.now();
        post.content = req.body.content;
        post.comments = req.body.comments;
        post.save();
       
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})



router.get('/all-posts/:id', auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.id });
        const author = await User.findById(req.params.id);
        // console.log(posts)
        //update the view count in posts
        posts.forEach(post => {
            post.views = post.views + 1;
            post.save();
        });
        // Map through the posts and add the username to each post
        const postsWithUsername = posts.map(post => {
            return {
                ...post._doc, // spread the properties of the post object
                username: author.username, // add the username property
            };
        });

        return res.status(200).send(postsWithUsername);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});



// binance.websockets.depth(['BNBBTC'], (depth) => {
//     let {e:eventType, E:eventTime, s:symbol, u:updateId, b:bidDepth, a:askDepth} = depth;
//     console.info(symbol+" market depth update");
//     console.info(bidDepth, askDepth);
//   });


module.exports = router
