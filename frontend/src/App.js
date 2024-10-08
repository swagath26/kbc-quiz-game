import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import QRCodeComponent from './QRCodeComponent';
import GameScreen from './GameScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerPage from './PlayerPage';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Listen for new questions and game updates
    newSocket.on('newQuestion', (question) => {
      setCurrentQuestion(question);
      console.log('new question');
    });

    newSocket.on('correctAnswer', ({ name }) => {
      alert(`Congratulations ${name}! Correct answer.`);
    });

    newSocket.on('gameOver', (players) => {
      // Handle end of game
      alert('Game Over!');
      setGameStarted(false);
    });

    return () => {
      console.log('app component unmount')
      newSocket.off('newQuestion');
      newSocket.off('correctAnswer');
      newSocket.off('gameOver');
    };
  }, []);

  const startGame = () => {
    socket.emit('startGame');
    setGameStarted(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>KBC Multiplayer Game</h1>
                {gameStarted ? (
                    <>
                        <GameScreen currentQuestion={currentQuestion} />
                        <QRCodeComponent url="http://localhost:3000/player" />
                    </>
                ) : (
                    <button onClick={startGame}>Start Game</button>
                )}
              </div>
            }
          />
          <Route path="/player" element={
            <PlayerPage 
              currentQuestion={currentQuestion}
              socket={socket}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;