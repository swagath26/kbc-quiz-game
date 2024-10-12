import React, { useState, useEffect } from 'react';
import { SadReaction, SuccessReaction } from './Animations';
import { io } from 'socket.io-client';
import GameScreen from './GameScreen';
import GameScreenMobile from './GameScreenMobile';
import Wrong from './Wrong';
import Congratulations from './Congratulations';
import Result from './Result';
import LeaderBoard from './LeaderBoard';

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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4em'}}>
      {
        socket? (
          name ? (
            gameStarted ? (
              currentQuestion ? (
                <>
                  <GameScreenMobile currentQuestion={currentQuestion} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
                  <button onClick={handleSubmit}>Submit</button>
                </> 
              ) : (
                isAnswered.state ?  
                  <>
                    {displayCorrectAnswer ? (
                      <div style={{display: 'flex', flexDirection: 'column', gap: '1em', textAlign: 'center', fontWeight: '400', alignItems: 'center'}}>
                        <SuccessReaction />
                        <div style={{fontSize: '20px'}}>Congratulations {name}!</div>
                        <div style={{fontSize: '16px'}}>You Gave the Right Answer! </div>
                      </div> ) : <></>}
                    {isAnswered.state ? 
                      <Congratulations name={isAnswered.name} answer={isAnswered.answer} gameEnded={gameEnded} />
                      : <></>}
                  </> : (
                  displayWrongAnswer ? 
                    <>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '1em', textAlign: 'center', fontWeight: '400', alignItems: 'center'}}>
                        <SadReaction />
                        <div style={{fontSize: '20px'}}>Sorry {name}</div>
                        <div style={{fontSize: '16px'}}>Wrong Answer! </div>
                        {!isAllWrong.state ? <div style={{fontSize: '16px'}}>Please wait for someone to answer...</div> : <></>}
                      </div>
                      {isAllWrong.state ? <Wrong answer={isAllWrong.answer} gameEnded={gameEnded} /> : <></> }
                    </> : 
                    <div>Please Wait...</div>
                )
              )
            ) : (
                <div style={{display: 'flex', justifyContent: 'center', marginBlock: '1em'}}>
                  {gameEnded ?
                    <div>
                      <Result winner={winner} />
                      <LeaderBoard players={players} setWinner={setWinner} gameEnded={true} />
                    </div>
                    : <div>Please Wait... Game is not Started yet</div>
                  }
                </div>
            )
          ) : (
            <form style={{display: 'flex', flexDirection: 'column', padding: '2em'}}>
                <label style={{paddingBottom: '0.5em', fontSize: '25px', fontWeight: '500'}} htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    style={{minWidth: '16em', padding: '0.75em', borderRadius: '10px'}}
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button 
                  type='submit'
                  style={{alignSelf: 'center', borderRadius: '15px', cursor: 'pointer'}}
                  onClick={(event) => handleJoinGame(event)}>
                    Join Game
                </button>
            </form>
          )
        ) : (
          <div>Loading...</div>
        )
      }
    </div>
  );
};

export default PlayerPage;