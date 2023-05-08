// Results.tsx
import React from "react";

const Results = () => {
  const foodRanking = JSON.parse(localStorage.getItem("foodRanking") || "[]");
  const sortedOptions = [...foodRanking].sort((a, b) => b.rating - a.rating);

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
