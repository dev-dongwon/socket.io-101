const http = require("http");
const socketio = require("socket.io");

const server = http.createServer((req, res) => {
  res.end('server connected');
});

server.listen(8000);