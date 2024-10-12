import React from 'react';
import useCountDown from './hooks/useCountDown';

const Congratulations = ({ name, answer, gameEnded }) => {
    const counter = useCountDown();
    
    return (
        <div className='wrong' style={{display: 'flex', gap: '2em', flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingBlock: '1em', overflowY: 'hidden', boxSizing: 'border-box'}}>
            <div style={{maxWidth: '20em', fontSize: '23px', fontWeight: '500', backgroundColor: '#004400', color: '#eeeeee', padding: '2em 2em', borderRadius: '25px', textAlign: 'center'}}>
                Congratulations {name}! The right answer is {answer}
            </div>
            <div style={{flexGrow: 1, fontSize: '20px', fontWeight: '500', textAlign: 'center'}}>
            {gameEnded ? 'Game Over! Results' : 'Next Question'} in {counter} seconds!
            </div>
        </div>
    );
};

export default Congratulations;