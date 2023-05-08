var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

app.use(express.static(__dirname + '/build'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

server = http.Server(app);
server.listen(3000);

io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.emit('greeting-from-server', {
    greeting: 'Hello Client'
  });

  socket.on('greeting-from-client', function (message) {
    console.log(message);
  });

  let rooms = {};

  // Add the createRoom event handler here
  socket.on("createRoom", (roomID) => {
    console.log("Room created with ID:", roomID);
    socket.join(roomID);

    // You can send a message to the room here if needed
    io.to(roomID).emit("roomCreated", {
      message: `Room ${roomID} created.`,
    });
  });
});
