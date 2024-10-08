// GameScreen.js
import React from 'react';

const GameScreen = ({ currentQuestion }) => {
  if (!currentQuestion) {
    return <div>Waiting for the next question...</div>;
  }

  return (
    <div className="game-screen">
      <h2>{currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="option">
            {index + 1}. {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;