import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";

const CreateRoom = () => {
  const [newRoomID, setNewRoomID] = useState("");
  const navigate = useNavigate();
  const socket = io("http://localhost:3000");

  socket.on("greeting-from-server", function (message) {
    console.log(message.greeting);
    socket.emit("greeting-from-client", {
      greeting: "Hello Server",
    });
  });

  const createRoom = () => {
    const roomID = Math.random().toString(36).substr(2, 5);
    setNewRoomID(roomID);
    socket.emit("createRoom", roomID);
  };

  const startGame = () => {
    navigate(`/start/${newRoomID}`);
    socket.on("connect", () => {
      console.log("socket.id " + socket.id); // x8WIv7-mJelg7on_ALbx
    });
  };

  return (
    <div className="main-frame-container d-flex align-items-center justify-content-center vh-100">
      <div className="container text-center">
        <h1>Create Room</h1>
        {!newRoomID && (
          <Button variant="primary" onClick={createRoom}>
            Create Room
          </Button>
        )}
        {newRoomID && (
          <>
            <div className="container">
              <Button className="m-1" variant="light">
                Room ID: {newRoomID}
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
              <Button variant="primary" onClick={startGame} className="m-1">
                Start Game
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
