import React, { useState } from "react";
import EloRank from "elo-rank";
import { useNavigate, useParams } from "react-router-dom";
import foodOptions from "./foodOptions";
import socket from "./socket/socket";
import { useParams } from "react-router-dom";

const StartSelect = () => {
  const [iteration, setIteration] = useState(0);
  const [options, setOptions] = useState(foodOptions);
  const [currentPair, setCurrentPair] = useState([0, 1]);
  const elo = new EloRank(32);
  const navigate = useNavigate();

  const { roomID } = useParams();

  const updateRatings = (winnerIndex: number, loserIndex: number) => {
    const winner = options[winnerIndex];
    const loser = options[loserIndex];

    const expectedScoreWinner = elo.getExpected(winner.rating, loser.rating);
    const expectedScoreLoser = elo.getExpected(loser.rating, winner.rating);

    winner.rating = elo.updateRating(expectedScoreWinner, 1, winner.rating);
    loser.rating = elo.updateRating(expectedScoreLoser, 0, loser.rating);

    const newOptions = [...options];
    setOptions(newOptions);

    // Save the updated rankings to local storage immediately
    localStorage.setItem("foodRanking", JSON.stringify(newOptions));
  };

  const chooseOption = (winnerIndex: number, loserIndex: number) => {
    updateRatings(winnerIndex, loserIndex);

    // Navigate to the results page after n iterations
    if (iteration >= 4) {
      navigate(`/results/${roomID}`);
      return;
    }

    setIteration((prevIteration) => prevIteration + 1);
    setCurrentPair((prevPair) => {
      const nextIteration = iteration + 1;
      const newPair = [
        nextIteration % options.length,
        (nextIteration + 1) % options.length,
      ];
      return newPair;
    });
  };

  return (
    <div className="main-frame-container d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <h1 className="text-center pb-5">Food Ranking</h1>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <button
              className="btn btn-primary w-100"
              onClick={() => chooseOption(currentPair[0], currentPair[1])}
            >
              {options[currentPair[0]].emoji} {options[currentPair[0]].name}
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-primary w-100"
              onClick={() => chooseOption(currentPair[1], currentPair[0])}
            >
              {options[currentPair[1]].emoji} {options[currentPair[1]].name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSelect;
