const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../Middleware/auth');

const User = require('../Models/User');
const upload = multer({ dest: 'assets/' });
const saltRounds = 10;

router.post('/users',upload.single('profilePicture'),async (req,res)=>{  
    console.log(req.file);  
    if (req.file) {  
      req.body.profilePicture = req.file.path;  
    }  
    //hash the password
    bcrypt.hash(req.body.password,saltRounds,async (err,hash)=>{
      if(err){
        console.log("error in saving password");
        return res.status(500).send(err);
      }
      req.body.password = hash;
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
  });
  

  router.get('/users', auth,async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

router.post('/login',async (req,res)=>{
  const user = await User.findOne({email: req.body.email});
  if(!user){
    return res.status(500).send('Invalid Email or Password');
  }

  const validPassword = await bcrypt.compare(req.body.password,user.password);
  if(!validPassword){
    return res.status(500).send('Invalid email or password');
  }
  //user authenticated successfully if he/she goes through the above steps
  const token = jwt.sign({ _id: user._id}, 'ThisIsMyPrivateKey');
  res.send(token);
});




module.exports = router;