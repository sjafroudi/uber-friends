import React, { useEffect } from "react";
import socket from "./socket/socket";
import { useParams } from "react-router-dom";

const Results = () => {
  const foodRanking = JSON.parse(localStorage.getItem("foodRanking") || "[]");
  const sortedOptions = [...foodRanking].sort((a, b) => b.rating - a.rating);
  const { roomID } = useParams();

  useEffect(() => {
    socket.emit("send-ranking", { results: sortedOptions, roomID });
  }, []); // [] dependency array (this effect runs once on mount)

  return (
    <div className="container mt-5">
      <h1 className="text-center">Food Ranking Results</h1>
      <ul>
        {sortedOptions.map((option, index) => (
          <li key={index}>
            {index + 1}. {option.emoji} {option.name} (
            {option.rating.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
