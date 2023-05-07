import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./MainFrame.css";
import Button from "react-bootstrap/Button";

const socket = io("http://localhost:4000");

const JoinRoom = () => {
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    socket.emit("joinRoom", roomID);
    navigate(`/start/${roomID}`);
  };

  localStorage.setItem("currentRoomID", roomID);

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
        <Button variant="primary" onClick={joinRoom} disabled={!roomID}>
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default JoinRoom;
