const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../Middleware/auth');
const nodemailer = require('nodemailer');
const crypto = require('crypto');



const User = require('../Models/User');
const upload = multer({ dest: 'assets/' });
const saltRounds = 10;
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;


router.post('/users',upload.single('profilePicture'),async (req,res)=>{ 
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

router.post('/forgot-password', async (req,res)=>{
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return res.status(400).send('User not found');
    }
    // Create a password reset token or new temporary password, and save it to the user model
    var tempPassword = crypto.randomBytes(20).toString('hex'); // Generate this securely
    console.log(tempPassword);
    bcrypt.hash(tempPassword,saltRounds,(err,hash)=>{
      if(err){
          console.log("error in saving password");
        return res.status(500).send(err);
      }
      tempPassword = hash;
      console.log(hash);
    })
    user.password = tempPassword;
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "bablu4195@gmail.com", 
        pass: "zazzbfmguddunkwr", 
        
      },
    });
    
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Venkata Sai Teja" bablu4195@gmail.com', // sender address
      to: user.email, // list of receivers
      subject: "Password Reset", // Subject line
      text: `Your new temporary password is ${tempPassword}`, // plain text body
    });
    
    console.log('password changed');
    await user.save();
      console.log(info,"email sent")
      res.status(200).send({ message: 'Password reset email '})

  } catch(error) {
    return res.status(500).send(error.toString());
  }
});

router.post('/change-password',async (req,res)=>{
  const oldUser  = User.findOne({email: req.body.email});  
  const tempPassword = await bcrypt.compare(req.body.tempPassword, oldUser.password);
  if(tempPassword){
  bcrypt.hash(req.body.changePassword,saltRounds,async (err,hash)=>{
    if(err){
      console.log("error in saving password");
      return res.status(500).send(err);
    }
    req.body.changePassword = hash;
  try {
    const user = await oldUser.save();
    console.log("request successfully");  
    return res.status(200).send(user);  
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);  
  }
});
} else {
  return res.status(500).send(err);
}
})

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