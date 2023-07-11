const WebSocketServer = require('websocket').server;
const http = require('http');


let connections = [];
const server = http.createServer(function(request, response) {
    console.log('Received request for ' + request.url);
    response.writeHead(404);
    response.end();
  });
// server.listen(3060, () => console.log('Server is listening on port 3060'));

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  timeout: 60000  // Set timeout to 60 seconds
});

// wsServer.on('request', (request) => {
//     const connection = request.accept(null, request.origin);
//     connections.push(connection);
//     connection.on('close', () => {
//         connections = connections.filter((conn) => conn !== connection);
//     });
// });

// wsServer.on('connect', (connection) => {
//     connection.on('message', async (message) => {
//         // console.log('Received message', message);
//         // const data = JSON.parse(message.utf8Data);
//         // sendToAllClients(data);
//          binance.websockets.miniTicker(async () => {
//             // console.info(markets);
//             // message = markets;
//             let ticker = await binance.prices();
//             // console.info("Price of BTC: ", ticker.BTCUSDT);
//             message = {"BTC":ticker.BTCUSDT};
//             sendToAllClients(message);
//             // console.log("Price of BTC: ", ticker.BTCUSDT);
//             // sendToAllClients(message);
//         });
       
//     });
// });

wsServer.on('request', (request) => {
    
    const connection = request.accept(null, request.origin);
    connections.push(connection);
    
    const retry = async (fn, n) => {
        for(let i = 0; i < n; i++) {
          try {
            return await fn();
          } catch(err) {
            if (err.code !== 'ESOCKETTIMEDOUT' || i === n - 1) throw err;
          }
        }
      };
      
      binance.websockets.miniTicker(async () => {
        let ticker = await retry(() => binance.prices(), 3);  // Retry up to 3 times
        const message = {"BTC":ticker.BTCUSDT};
        sendToAllClients(message);
      });
      

    connection.on('close', () => {
        connections = connections.filter((conn) => conn !== connection);
    });
});


wsServer.on('close', (connection) => {
    console.log('Connection closed');
    const newConnection = request.accept(null, request.origin);
    connections.push(newConnection);
});


function sendToAllClients(message) {
    connections.forEach((conn) => conn.send(JSON.stringify(message)));
}

module.exports = { wsServer, connections, server };
