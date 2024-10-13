import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import GameScreenMobile from './GameScreenMobile';
import GameStatusMessage from './GameStatusMessage';
import StartGame from './StartGame';
import JoinForm from './JoinForm';

const PlayerPage = () => {

  const [name, setName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [displayWrongAnswer, setDisplayWrongAnswer] = useState(false);
  const [displayCorrectAnswer, setDisplayCorrectAnswer] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isAnswered, setisAnswered] = useState({ state: false, name: '', answer: '' });
  const [isAllWrong, setIsAllWrong] = useState({ state: false, answer: '' });
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const newSocket = io(backendURL);
    setSocket(newSocket);

    newSocket.on('newQuestion', (question) => {
      setisAnswered({ state: false, name: '', answer: '' });
      setIsAllWrong({ state: false, answer: '' });
      setDisplayCorrectAnswer(false);
      setDisplayWrongAnswer(false);
      setCurrentQuestion(question);
      setGameStarted(true);
      setGameEnded(false);
    });

    newSocket.on('correctAnswer', ({ name, answer, updatedPlayers }) => {
      setisAnswered({state: true, name: name, answer: answer});
      setCurrentQuestion(null);
      setPlayers(updatedPlayers);
    });

    newSocket.on('allWrong', ({ answer, updatedPlayers }) => {
      setIsAllWrong({ state: true, answer: answer });
      setCurrentQuestion(null);
      setPlayers(updatedPlayers);
    });

    newSocket.on('gameOver', () => {
      setGameEnded(true);
      setTimeout(() => setGameStarted(false), 5000);
    });

    newSocket.on('currentQuestion', (question) => {
      setCurrentQuestion(question);
      setGameStarted(true);
      setGameEnded(false);
    });

    newSocket.on('congrats', () => {
      setDisplayCorrectAnswer(true);
      setCurrentQuestion(null);
    });

    newSocket.on('wrongAnswer', ({ name }) => {
      setDisplayWrongAnswer(true);
      setCurrentQuestion(null);
    });

    return () => {
      newSocket.off('newQuestion');
      newSocket.off('correctAnswer');
      newSocket.off('allWrong');
      newSocket.off('gameOver');
      newSocket.off('currentQuestion');
      newSocket.off('wrongAnswer');
    };
  }, []);

  const handleJoinGame = (event) => {
    event.preventDefault();
    setName(playerName);
    socket?.emit('joinGame', playerName);
  }

  const handleSubmit = () => {
    if(name) socket?.emit('submitAnswer', { answer: selectedAnswer, playerName: name });
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2em 2em'}}>
      {
        socket? (
          name ? (
            gameStarted ? (
              currentQuestion ? (
                <GameScreenMobile currentQuestion={currentQuestion} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} handleSubmit={handleSubmit}/>
              ) : (
                <GameStatusMessage isAnswered={isAnswered} isAllWrong={isAllWrong} displayCorrectAnswer={displayCorrectAnswer}
                  displayWrongAnswer={displayWrongAnswer} gameEnded={gameEnded} name={name} />
              )
            ) : (
              <StartGame winner={winner} setWinner={setWinner} gameEnded={gameEnded} players={players} />
            )
          ) :
            <JoinForm playerName={playerName} setPlayerName={setPlayerName} handleJoinGame={handleJoinGame} />
        ) : (
          <div style={{fontSize: '20px'}}>Connecting...</div>
        )
      }
    </div>
  );
};

export default PlayerPage;