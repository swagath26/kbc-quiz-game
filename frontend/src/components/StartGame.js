import LeaderBoard from "./LeaderBoard";
import Result from "./Result";

const StartGame = ({gameEnded, winner, setWinner, players}) => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBlock: '1em'}}>
        <h1 style={{textAlign: 'center', paddingBlock: '1em'}}>KBC Multiplayer Game</h1>
        {gameEnded ?
          <div>
            <Result winner={winner} />
            <LeaderBoard players={players} setWinner={setWinner} gameEnded={true} />
          </div>
          : <div style={{fontSize: '16px'}}>Please Wait...<br/> Game is not Started yet</div>
        }
      </div>
    )
};

export default StartGame;