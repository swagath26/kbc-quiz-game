const JoinForm = ({playerName, setPlayerName, handleJoinGame}) => {
    return (
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
};

export default JoinForm;