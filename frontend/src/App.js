import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Game from './Game';
import QRCodeComponent from './QRCodeComponent';

const socket = io('http://localhost:3001'); // Update URL for production

const App = () => {
    const [question, setQuestion] = useState(null);
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        // Fetch the first question when the app loads
        fetch('http://localhost:3001/questions')
            .then(response => response.json())
            .then(data => setQuestion(data[0]));
    }, []);

    // Handle player name submission
    const handleNameSubmit = (name) => {
        setPlayerName(name);
    };

    return (
        <div className="App">
            <h1>KBC Game</h1>
            {playerName ? (
                <>
                    <Game question={question} socket={socket} playerName={playerName} />
                    <QRCodeComponent url={`http://localhost:3000/player?name=${playerName}`} />
                </>
            ) : (
                <input type="text" placeholder="Enter your name" onBlur={(e) => handleNameSubmit(e.target.value)} />
            )}
        </div>
    );
};

export default App;