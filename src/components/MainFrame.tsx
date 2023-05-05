import React from "react";
import "./MainFrame.css";
import Button from "react-bootstrap/Button";
import solo from "../img/solo.svg";
import friends from "../img/friends.svg";
import { Routes, Route, Link } from "react-router-dom";

const MainFrame = () => {
  return (
    <div className="main-frame-container d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <h1 className="text-center pb-5">uber-friends</h1>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <Link to="/solo">
              <Button variant="primary" type="submit" className="w-100">
                <img src={solo} alt="Solo" className="me-2 solo" />
                Solo
              </Button>
            </Link>
          </div>
          <div className="col">
            <Button variant="primary" type="submit" className="w-100">
              <img src={friends} alt="Friends" className="me-2 friends" />
              With Friends
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFrame;
