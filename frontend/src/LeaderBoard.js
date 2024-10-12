import React, { useEffect } from 'react';

const LeaderBoard = ({ players, setWinner, gameEnded=false }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const topPlayers = gameEnded ? sortedPlayers : sortedPlayers.slice(0,3);
  useEffect(() => {
    setWinner(topPlayers[0].name || null);
  }, []);
  
  return (
    <div className="leader-board" style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', gap: '1em', paddingBlock: '1em', boxSizing: 'border-box'}}>
        <h3 style={{textAlign: 'center', color: '#555555'}}>Leader Board</h3>
        <div style={{display: 'flex', gap: '1em', fontSize: '20px', fontWeight: 500, alignItems: 'center'}}>
          <div className='leader-board-rank'>Rank</div>
          <div className='leader-board-name' style={{flexGrow: 1, padding: '0 0.5em'}}>Player</div>
          <div className='leader-board-score'>Score</div>
        </div>
        {topPlayers.map((player, index) => (
          <div key={index} style={{display: 'flex', gap: '1em', fontSize: '20px', fontWeight: 500, alignItems: 'center'}}>
            <div className='leader-board-rank'>
              <div style={{backgroundColor: `${index === 0 ? 'gold' : index === 1 ? 'gray' : index === 2 ? 'brown' : 'black'}`, width: '2em', height: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', color: 'white'}}>{index+1}</div>
            </div>
            <div className='leader-board-name' style={{flexGrow: 1}}>{player.name}</div>
            <div className='leader-board-score'>{player.score}</div>
          </div>
        ))}
    </div>
  );
};

export default LeaderBoard;