const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

const rankingsByRoom = {}; // In-memory storage for rankings
const usersInRoom = {}; // Keep track of the number of users in each room

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("createRoom", (roomID) => {
    socket.join(roomID);
    usersInRoom[roomID] = 1; // Room creator is the first user in the room
  });

  socket.on("joinRoom", (roomID) => {
    socket.join(roomID);
    if (!usersInRoom[roomID]) {
      usersInRoom[roomID] = 0;
    }
    usersInRoom[roomID]++;
  });

  socket.on("submitRanking", ({ roomID, ranking }) => {
    if (!rankingsByRoom[roomID]) {
      rankingsByRoom[roomID] = [];
    }
    rankingsByRoom[roomID].push(ranking);

    if (rankingsByRoom[roomID].length === usersInRoom[roomID]) {
      io.to(roomID).emit("updateRankings", rankingsByRoom[roomID]);
    }
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
