
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
console.log(server);
server.listen(3000);
io = socketIO(server);

// Create an object to track the number of users in each room.
var roomSizes = {};

io.on('connection', function (socket) {

  // Listener for 'join' event.
  socket.on('join', function (room) {
    console.log("A user connected: ", socket.id);
    // If the room doesn't exist yet, initialize it with a size of 0.
    if (!roomSizes[room]) {
      roomSizes[room] = 0;
    }

    // If the room is not full, join the room and increment the room size.
    if (roomSizes[room] < 5) {
      socket.join(room);
      roomSizes[room]++;
    } else {
      // Otherwise, send an error message.
      socket.emit('error', 'Room is full');
    }
  });

  socket.on('send-ranking', function (data) {
    const { roomID, results } = data;
    console.log(`Quiz finished in room ${roomID}. Results:`, results);
    socket.to(roomID).emit('send-ranking', results);
  });

  // Listener for 'message' event.
  socket.on('message', function (data) {
    io.to(data.room).emit('message', data.message);
  });

  // Listener for 'leave' event.
  socket.on('leave', function (room) {
    // When a client leaves a room, decrement the room size. Also, handle the case where the room doesn't exist (i.e., the client wasn't in any rooms).
    if (roomSizes[room]) {
      roomSizes[room]--;
      if (roomSizes[room] === 0) {
        delete roomSizes[room];
      }
    }
    socket.leave(room);
  });
});
