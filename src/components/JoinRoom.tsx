import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./MainFrame.css";
import Button from "react-bootstrap/Button";
import socket from "./socket/socket";
import { Link } from "react-router-dom";

const JoinRoom = () => {
  const [roomID, setRoomID] = useState("");

  const joinRoom = () => {
    // Emit a 'join' event to the server, with the room ID as the data.
    socket.emit("join", roomID);
  };

  return (
    <div className="main-frame-container d-flex align-items-center justify-content-center vh-100">
      <div className="container text-center">
        <h1>Join Room</h1>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="form-control w-100 mb-3"
        />
        <Link to={`/start/${roomID}`}>
          <Button variant="primary" onClick={joinRoom} disabled={!roomID}>
            Join Room
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JoinRoom;
