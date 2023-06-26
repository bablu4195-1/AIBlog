const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../Middleware/auth');

const User = require('../Models/User');
const upload = multer({ dest: 'assets/' });
const saltRounds = 10;
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

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
  

  

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ _id: user._id }, jwtPrivateKey);
    return res.status(200).send({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
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




module.exports = router;