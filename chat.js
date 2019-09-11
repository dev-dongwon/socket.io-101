const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on("connection", socket => {
  socket.on("newMessage", msg => {
    // console.log(msg);
    io.emit('messageToClient', {type: 'texting', text: msg.text, id: msg.id})
  });
  socket.on("newPerson", msg => {
    // console.log(msg);
    io.emit('messageToClient', {type: 'enter', id : msg.id})
  });
});
