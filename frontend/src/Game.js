import React, { useEffect, useState } from 'react';

const Game = ({ question, socket, playerName }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [message, setMessage] = useState('');

    const handleAnswerSubmit = () => {
        socket.emit('answer', { answer: selectedAnswer, questionIndex: 0, name: playerName });
    };

    useEffect(() => {
        socket.on('correct', ({ name }) => {
            setMessage(`Congratulations, ${name}! You answered correctly.`);
        });

        socket.on('wrong', ({ name }) => {
            setMessage(`Sorry, ${name}. That answer is wrong.`);
        });

        return () => {
            socket.off('correct');
            socket.off('wrong');
        };
    }, [socket]);

    if (!question) return <div>Loading...</div>;

    return (
        <div>
            <h2>{question.question}</h2>
            {question.options.map((option, index) => (
                <div key={index}>
                    <input 
                        type="radio" 
                        id={`option${index}`} 
                        name="answer" 
                        value={option} 
                        onChange={(e) => setSelectedAnswer(e.target.value)} 
                    />
                    <label htmlFor={`option${index}`}>{option}</label>
                </div>
            ))}
            <button onClick={handleAnswerSubmit}>Submit Answer</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Game;