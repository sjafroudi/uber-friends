import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const CreateOrJoinRoom = () => {
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const newRoomID = Math.random().toString(36).substr(2, 5);
    socket.emit("createRoom", newRoomID);
    navigate(`/start/${newRoomID}`);
  };

  const joinRoom = () => {
    socket.emit("joinRoom", roomID);
    navigate(`/start/${roomID}`);
  };

  return (
    <div>
      <h1>With Friends</h1>
      <button onClick={createRoom}>Create Room</button>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <button onClick={joinRoom} disabled={!roomID}>
        Join Room
      </button>
    </div>
  );
};

export default CreateOrJoinRoom;
