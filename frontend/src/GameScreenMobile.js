import React from 'react';

const GameScreenMobile = ({ currentQuestion, selectedAnswer, setSelectedAnswer }) => {
  if (!currentQuestion) {
    return <></>;
  }

  return (
    <div className="game-screen" style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>
      <h2>{currentQuestion.question}</h2>
      <div className="options" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1em'}}>
        {currentQuestion.options.map((option, index) => (
            <label 
                htmlFor={`option${index}`} 
                key={index} 
                className="option" 
                style={{width: '35%', minWidth: '200px', maxWidth: '400px', padding: '1em', cursor: 'pointer', 
                    backgroundColor: `${selectedAnswer === option ? '#aaaaaa' : '#eeeeee'}`
                }}
            >
                {index + 1}. {option}
                <input
                    style={{visibility: 'hidden'}}
                    type="radio"
                    id={`option${index}`}
                    name="answer"
                    value={option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                />
            </label>
        ))}
      </div>
    </div>
  );
};

export default GameScreenMobile;