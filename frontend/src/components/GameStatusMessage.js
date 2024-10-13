import { SadReaction } from "./Animations";
import Congratulations from "./Congratulations";
import Wrong from "./Wrong";

const GameStatusMessage = ({isAnswered, isAllWrong, displayCorrectAnswer, displayWrongAnswer, gameEnded, name}) => {
    return (
      isAnswered.state ?  
        <Congratulations name={isAnswered.name} answer={isAnswered.answer} gameEnded={gameEnded} self={displayCorrectAnswer} />
        : (
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
          <div style={{fontSize: '16px'}}>Please Wait...</div>
      )
    )
};

export default GameStatusMessage;