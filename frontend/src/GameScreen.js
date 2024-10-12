import React from 'react';

const GameScreen = ({ currentQuestion }) => {
  if (!currentQuestion) {
    return <></>;
  }

  return (
    <div className="game-screen" style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>
      <h2>{currentQuestion.question}</h2>
      <div className="options" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1em'}}>
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="option" style={{width: '35%', minWidth: '200px', maxWidth: '400px', padding: '1em'}}>
            {index + 1}. {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;