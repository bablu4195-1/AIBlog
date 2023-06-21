const express = require('express');
const router = express.Router();
const multer = require('multer');


const User = require('../Models/User');
const upload = multer({ dest: 'assets/' });

router.post('/users',upload.single('profilePicture'),(req,res)=>{
    console.log(req.file);
    if (req.file) {
        req.body.profilePicture = req.file.path;
    }
    const newUser = new User(req.body);
    newUser.save((err,user)=>{
        console.log(err);
        if(err) return res.status(500).send(err);
        console.log("request successfully");
        return res.status(200).send(user);
    });
});

router.get('/users',(req,res)=>{
    User.find((err,users)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send(users);
    });
});

module.exports = router;