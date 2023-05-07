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

const socket = io("http://localhost:4000");

const CreateRoom = () => {
  const [newRoomID, setNewRoomID] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const roomID = Math.random().toString(36).substr(2, 5);
    setNewRoomID(roomID);
    socket.emit("createRoom", roomID);
  };

  const shareRoom = () => {
    // Implement the share functionality here
    console.log("Share button clicked");
  };

  const startGame = () => {
    navigate(`/start/${newRoomID}`);
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
