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
  const [message, setMessage] = useState(null);
  const [secondMessage, setSecondMessage] = useState(null);
  var counter = null;
  var count = 4;

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Listen for new questions and game updates
    newSocket.on('newQuestion', (question) => {
      setCurrentQuestion(question);
      setMessage(null);
      setSecondMessage(null);
      if(counter) clearInterval(counter);
      count = 0;
    });

    newSocket.on('correctAnswer', ({ name, answer }) => {
      setMessage(`Congratulations ${name}! The correct answer is ${answer}`);
      setCurrentQuestion(null);
      count = 4;
      counter = setInterval(function () {
        setSecondMessage(`Next question in ${count} seconds...`);
        count -= 1;
        if(count <= 0) clearInterval(counter);
      }, 1000)
    });

    newSocket.on('allWrong', ({ answer }) => {
      setMessage(`No one got the right answer: ${answer}`);
      setCurrentQuestion(null);
      count = 4;
      counter = setInterval(function () {
        setSecondMessage(`Next question in ${count} seconds...`);
        count -= 1;
        if(count <= 0) clearInterval(counter);
      }, 1000)
    });

    newSocket.on('gameOver', (players) => {
      // Handle end of game
      if(counter) clearInterval(counter);
      setCurrentQuestion(null);
      setSecondMessage('Game Over!');
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
                      <div>{message}<br/>{secondMessage}</div>
                      <GameScreen currentQuestion={currentQuestion} />
                      <QRCodeComponent url="http://localhost:3000/player" />
                    </>
                ) : (
                    <div>
                      {message}<br/>{secondMessage}
                      <button onClick={startGame}>Start Game</button>
                    </div>
                )}
              </div>
            }
          />
          <Route path="/player" element={
            <PlayerPage 
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              message={message}
              setMessage={setMessage}
              secondMessage={secondMessage}
              setSecondMessage={setSecondMessage}
              socket={socket}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;