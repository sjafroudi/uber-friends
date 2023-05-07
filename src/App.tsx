import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainFrame from "./components/MainFrame";
import LocationInput from "./components/LocationInput";
import StartSelect from "./components/StartSelect";
import Results from "./components/Results";
import CreateOrJoinRoom from "./components/CreateOrJoinRoom";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainFrame />} />
        <Route path="/solo" element={<StartSelect />} />
        <Route path="/start" element={<StartSelect />} />
        <Route path="/results" element={<Results />} />
        <Route path="/friends" element={<CreateOrJoinRoom />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/start/:roomID" element={<StartSelect />} />
      </Routes>
    </Router>
  );
}

export default App;
