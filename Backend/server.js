const app = require('./app');
const port = 3000;

const WebSocketServer = require('websocket').server;
const { server } = require('../Backend/Socket/socket');
const http = require('http');








// wsServer.on('request', function(request) {
//   const connection = request.accept(null, request.origin);
//   console.log('Client connected');
//   connection.send('connected');
//   connection.sendUTF('Hello client!');
// });




app.get('',(req,res)=>{
    res.send('Hello World');
})
// app.use('/api',router);
app.listen(port,function(){
    console.log(`App is running on port ${port}`);
});


const socket_port = 3060;
server.listen(socket_port, function() {
  console.log(`Server is listening on port ${socket_port}`);
});