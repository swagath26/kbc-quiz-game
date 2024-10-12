import React, { useEffect, useState } from 'react';
import QRCodeComponent from './QRCodeComponent';
import GameScreen from './GameScreen';
import { io } from 'socket.io-client';
import LeaderBoard from './LeaderBoard';
import Notification from './Notification';
import Congratulations from './Congratulations';
import Wrong from './Wrong';
import Result from './Result';

const MainScreen = () => {

  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [winner, setWinner] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isAnswered, setisAnswered] = useState({ state: false, name: '', answer: '' });
  const [isAllWrong, setIsAllWrong] = useState({ state: false, answer: '' });
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const newSocket = io(backendURL);
    setSocket(newSocket);

    newSocket.on('playerList', ({currentPlayers}) => {
      setPlayers(currentPlayers);
      // setNotifications((prev) => [...prev, `${playerName} has Joined the Game!`]);
    });

    newSocket.on('newPlayer', (player) => {
      setNotifications((prev) => [...prev, `${player.name} has Joined the Game!`]);
      setPlayers((prevPlayers) => [...prevPlayers, player]);
    });

    newSocket.on('playerLeft', (playerLeft) => {
      setNotifications((prev) => [...prev, `${playerLeft.name} has left the Game!`]);
      setPlayers((prevPlayers) => prevPlayers.filter((prevPlayer) => prevPlayer.id !== playerLeft.id));
    });

    newSocket.on('newQuestion', (question) => {
      setisAnswered({ state: false, name: '', answer: '' });
      setIsAllWrong({ state: false, answer: '' });
      setCurrentQuestion(question);
    });

    newSocket.on('correctAnswer', ({ name, answer, updatedPlayers }) => {
      setisAnswered({state: true, name: name, answer: answer});
      setPlayers(updatedPlayers);
    });

    newSocket.on('allWrong', ({ answer, updatedPlayers }) => {
      setIsAllWrong({ state: true, answer: answer });
      setPlayers(updatedPlayers);
    });

    newSocket.on('gameOver', () => {
      setGameEnded(true);
      setTimeout(() => setGameStarted(false), 5000);
    });

    return () => {
      newSocket.off('newQuestion');
      newSocket.off('newPlayer');
      newSocket.off('correctAnswer');
      newSocket.off('isAllWrong');
      newSocket.off('gameOver');
    };
  }, []);

  const handleNotificationClose = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const startGame = () => {
    socket.emit('startGame');
    setGameEnded(false);
    setGameStarted(true);
  };

  const frontendURL = process.env.REACT_APP_FRONTEND_URL;

  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column', padding: '0 2em'}}>
      {gameStarted ? (
          <div className='main-screen' style={{display: 'flex', flexGrow: 1, gap: '3em'}}>
            <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '2em', maxWidth: '900px', padding: '1em 1em', boxSizing: 'border-box'}}>
              <GameScreen currentQuestion={currentQuestion} />
              {!isAnswered.state && !isAllWrong.state ? 
                (players.length > 1 ? <LeaderBoard players={players} setWinner={setWinner} /> : <></>)
                : isAnswered.state ?
                  <Congratulations name={isAnswered.name} answer={isAnswered.answer} gameEnded={gameEnded} />
                  : <Wrong answer={isAllWrong.answer} gameEnded={gameEnded} />
              }
            </div>
            <QRCodeComponent url={`${frontendURL}/player`} />
            {notifications.map((notification, index) => (
              <Notification
                key={index}
                notification={notification}
                duration={3000} 
                onClose={() => handleNotificationClose(index)}
              />
            ))}
          </div>
      ) : (
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBlock: '1em'}}>
            <h1 style={{textAlign: 'center', paddingBlock: '1em'}}>KBC Multiplayer Game</h1>
            {gameEnded ?
              <div>
                <br/><br/><Result winner={winner} /><br/><br/><br/>
                <LeaderBoard players={players} setWinner={setWinner} gameEnded={true} />
              </div>
              : <></>
            }
            <button 
              onClick={startGame}
              style={{borderRadius: '15px', cursor: 'pointer', marginTop: '2em'}}
            >New Game</button>
          </div>
      )}
    </div>
  );
};

export default MainScreen;