import React, { useState, useEffect } from 'react';

const PlayerPage = ({currentQuestion, socket}) => {
  // console.log(socket);
  const [name, setName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    // Join game on connect
    if (name) {
      socket?.emit('joinGame', name);
    }

    socket?.on('wrongAnswer', ({ name }) => {
      alert(`Sorry ${name}, that's incorrect.`);
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
                          id='question'
                          name="answer"
                          value={option}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                      />
                      <label htmlFor='#question'>{option}</label>
                      </div>
                  ))}
                  <button onClick={handleSubmit}>Submit Answer</button>
              </div> ) : (
              <div>
                Wait for the question!
              </div>
            ))
            : (
            <div>
                <label htmlFor='#name'>Name:</label>
                <input
                    type='text'
                    id='name'
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button onClick={() => {
                  setName(playerName);
                  console.log(currentQuestion ? currentQuestion : 'prr', currentQuestion);
                }
                }>Submit</button>
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