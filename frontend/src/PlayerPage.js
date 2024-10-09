import React, { useState, useEffect } from 'react';

const PlayerPage = ({currentQuestion, setCurrentQuestion, message, setMessage, secondMessage, setSecondMessage, socket}) => {

  const [name, setName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    // Join game on connect
    if (name) {
      socket?.emit('joinGame', name);
    }

    socket?.on('currentQuestion', (question) => {
      setCurrentQuestion(question);
    });

    socket?.on('wrongAnswer', ({ name }) => {
      setMessage(`Sorry ${name}, that's incorrect. You had only one chance`);
      setSecondMessage('Wait for the next question!')
      setCurrentQuestion(null);
    });

    return () => {
      socket?.off('wrongAnswer');
    };
  }, [name, socket]);

  const handleSubmit = () => {
    socket?.emit('submitAnswer', { answer: selectedAnswer, playerName: name });
  };

  return (
    <div>
      {
        socket? (
          name ? (
            currentQuestion ? (
              <div>
                  <h2>{currentQuestion.question}</h2>
                  {currentQuestion.options.map((option, index) => (
                      <div key={index}>
                      <input
                          type="radio"
                          id={`question${index}`}
                          name="answer"
                          value={option}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                      />
                      <label htmlFor={`question${index}`}>{option}</label>
                      </div>
                  ))}
                  <button onClick={handleSubmit}>Submit Answer</button>
              </div> ) : (
              message ? 
                <div>
                  {message}<br/>{secondMessage}
                </div> 
                :
                <div>
                  Please wait!
                </div>
              )
            )
            : (
            <div>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    id='name'
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button onClick={() => setName(playerName)}>Submit</button>
            </div>
          )
        ) : (
          <div>Loading...</div>
        )
      }
    </div>
  );
};

export default PlayerPage;