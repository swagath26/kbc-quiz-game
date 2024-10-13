import React, { useEffect } from 'react';

const LeaderBoard = ({ players, setWinner, gameEnded=false }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const topPlayers = gameEnded ? sortedPlayers : sortedPlayers.slice(0,3);
  useEffect(() => {
    setWinner(topPlayers[0].name || null);
  }, []);
  
  return (
    <div className="leader-board" style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', boxSizing: 'border-box'}}>
        <h3 style={{textAlign: 'center', color: '#555555', marginBottom: '0.5em'}}>Leader Board</h3>
        <div className='leader-board-row' style={{display: 'flex', alignItems: 'center'}}>
          <div className='leader-board-rank'>Rank</div>
          <div className='leader-board-name' style={{flexGrow: 1, padding: '0 0.5em'}}>Player</div>
          <div className='leader-board-score' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Score</div>
        </div>
        {topPlayers.map((player, index) => (
          <div className='leader-board-row' key={index} style={{display: 'flex', alignItems: 'center'}}>
            <div className='leader-board-rank'>
              <div style={{backgroundColor: `${index === 0 ? 'gold' : index === 1 ? 'gray' : index === 2 ? 'brown' : 'black'}`, width: '2em', height: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', color: 'white'}}>{index+1}</div>
            </div>
            <div className='leader-board-name' style={{flexGrow: 1}}>{player.name}</div>
            <div className='leader-board-score' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{player.score}</div>
          </div>
        ))}
    </div>
  );
};

export default LeaderBoard;