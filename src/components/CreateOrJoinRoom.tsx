import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
    <div className="main-frame-container d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <h1 className="text-center pb-5">With Friends</h1>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <Link to="/create-room">
              <Button variant="primary" type="submit" className="w-100">
                Create Room
              </Button>
            </Link>
          </div>
          <div className="col">
            <Link to="/join-room">
              <Button variant="primary" type="submit" className="w-100">
                Join Room
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrJoinRoom;
