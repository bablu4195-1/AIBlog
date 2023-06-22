const express = require('express');
const router = express.Router();
const multer = require('multer');


const User = require('../Models/User');
const upload = multer({ dest: 'assets/' });

router.post('/users',upload.single('profilePicture'),async (req,res)=>{  
    console.log(req.file);  
    if (req.file) {  
      req.body.profilePicture = req.file.path;  
    }  
    const newUser = new User(req.body);  
    try {
      const user = await newUser.save();
      console.log("request successfully");  
      return res.status(200).send(user);  
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);  
    }
  });
  

  router.get('/users', async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
});


module.exports = router;