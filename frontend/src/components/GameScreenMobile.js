import React from 'react';

const GameScreenMobile = ({ currentQuestion, selectedAnswer, setSelectedAnswer, handleSubmit }) => {
  if (!currentQuestion) {
    return <></>;
  }

  return (
    <div className="game-screen" style={{display: 'flex', flexDirection: 'column', gap: '2em'}}>
      <h2>{currentQuestion.question}</h2>
      <div className="options" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1.25em'}}>
        {currentQuestion.options.map((option, index) => (
            <label 
                htmlFor={`option${index}`} 
                key={index} 
                className="option" 
                style={{width: '35%', minWidth: '200px', maxWidth: '400px', padding: '0.75em 1em', cursor: 'pointer', borderRadius: '15px',
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
      <button 
        style={{borderRadius: '15px', cursor: 'pointer', marginTop: '1em'}}
        onClick={handleSubmit}
      >Submit</button>
    </div>
  );
};

export default GameScreenMobile;