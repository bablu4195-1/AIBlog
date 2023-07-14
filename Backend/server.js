const app = require('./app');
const port = 3000;

const { startWebSocketServer } = require('../Backend/Socket/socket');







app.get('',(req,res)=>{
    res.send('Hello World');
})
// app.use('/api',router);
app.listen(port,function(){
    console.log(`App is running on port ${port}`);
});

