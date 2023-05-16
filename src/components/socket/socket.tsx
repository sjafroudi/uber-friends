import io from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to socket.io server!");
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket.io server!");
});

export default socket;
