import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import socket from "./socket/socket";

const CreateRoom = () => {
  const [roomID, setRoomID] = useState("");

  useEffect(() => {
    const newRoomID = Math.random().toString(36).substr(2, 5);
    setRoomID(newRoomID);
  }, []); // Dependency array is empty, so this effect runs once on mount

  const joinRoom = () => {
    // Emit a 'join' event to the server, with the room ID as the data.
    socket.emit("join", roomID);
  };

  return (
    <div className="main-frame-container d-flex align-items-center justify-content-center vh-100">
      <div className="container text-center">
        <h1>Create Room</h1>
        <div className="container">
          <Button className="m-1" variant="light">
            Room ID: {roomID}
          </Button>
          <WhatsappShareButton url="https://uber.github.io/kepler.gl/">
            <WhatsappIcon size={32} />
          </WhatsappShareButton>{" "}
          <FacebookMessengerShareButton
            appId="139691692416764"
            url="https://uber.github.io/kepler.gl/"
          >
            <FacebookMessengerIcon size={32} />
          </FacebookMessengerShareButton>
          <Link to={`/start/${roomID}`}>
            <Button variant="primary" onClick={joinRoom} className="m-1">
              Start Game
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
