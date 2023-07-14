const WebSocketServer = require('websocket').server;
const http = require('http');

let connections = [];
let wsServer;
let server;

function startWebSocketServer() {
  server = http.createServer(function(request, response) {
    console.log('Received request for ' + request.url);
    response.writeHead(404);
    response.end();
  });

  wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

  wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    connections.push(connection);

    connection.on('close', () => {
      connections = connections.filter((conn) => conn !== connection);
    });
  });

  wsServer.on('connect', (connection) => {
    connection.on('message', async (message) => {
      // Handle incoming messages
    });
  });

  wsServer.on('close', () => {
    console.log('WebSocket server connection closed');
    // Attempt reconnection after a certain interval
    setTimeout(connectWebSocketServer, 5000);
  });

  server.listen(3060, () => {
    console.log('WebSocket server is listening on port 3060');
    
  });
}

function connectWebSocketServer() {
  const Binance = require('node-binance-api');
  const binance = new Binance().options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
    timeout: 60000  // Set timeout to 60 seconds
  });

  const retry = async (fn, n) => {
    for (let i = 0; i < n; i++) {
      try {
        return await fn();
      } catch (err) {
        if (err.code !== 'ESOCKETTIMEDOUT' || i === n - 1) throw err;
      }
    }
  };

  binance.websockets.miniTicker(async () => {
    let ticker = await retry(() => binance.prices(), 3);  // Retry up to 3 times
    const message = { "BTC": ticker.BTCUSDT };
    sendToAllClients(message);
  });
}

function sendToAllClients(message) {
  connections.forEach((conn) => conn.send(JSON.stringify(message)));
}

module.exports = { startWebSocketServer,connections,connectWebSocketServer};

// Start the WebSocket server
startWebSocketServer();
