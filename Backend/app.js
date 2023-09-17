require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/users');
const commentRoutes = require('./Routes/comments');
const postRoutes = require('./Routes/posts');
const likeRoutes = require('./Routes/likes');


const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myblog', {useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database!');
  let arr = [1,2,3,4,5]
  let arr2 = arr.splice(3,4)
  console.log(arr2)
});


app.use('/assets', express.static('assets'));

// Add your routes here...

app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/likes',likeRoutes);

// let arr = [7, 3, 7, 11, 3, 3, 7, 9, 11];
// function Unque(arr){
//     let uniqueArr = [];
//     for(let i = 0; i < arr.length; i++){
//         if(uniqueArr.indexOf(arr[i]) === -1){
//             uniqueArr.push(arr[i]);
//         }
//     }
//     console.log(uniqueArr);
//     return uniqueArr;
// }
// Unque(arr);
module.exports = app;
