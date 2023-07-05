const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');
const auth = require('../Middleware/auth');
const User = require('../Models/User');


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

router.get('/all-posts/:id', auth, async (req, res) => {
    // try {
    //   Post.find((err,posts)=>{
    //     return res.status(200).send(posts);
    //    })
    // } catch (error) {
    //   return res.status(500).send(error);
    // }
    try {
        const posts = await Post.find({ author: req.params.id });
        const author = await User.findById(req.params.id);

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
})


module.exports = router