import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainFrame from "./components/MainFrame";
import LocationInput from "./components/LocationInput";
import StartSelect from "./components/StartSelect";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainFrame />} />
        <Route path="/solo" element={<LocationInput />} />
        <Route path="/start" element={<StartSelect />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
