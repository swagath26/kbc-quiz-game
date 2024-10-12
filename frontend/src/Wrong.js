import React from 'react';
import useCountDown from './hooks/useCountDown';

const Wrong = ({ answer, gameEnded }) => {
    const counter = useCountDown();
    return (
        <div className='wrong' style={{display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
            <div style={{maxWidth: '20em', backgroundColor: '#440000', color: '#eeeeee', padding: '2em 2em', borderRadius: '25px', textAlign: 'center'}}>
                No one got the right answer - {answer}
            </div>
            <div style={{flexGrow: 1, fontSize: '20px', fontWeight: '500', textAlign: 'center'}}>
                {gameEnded ? 'Game Over! Results' : 'Next Question'} in {counter} seconds!
            </div>
        </div>
    );
};

export default Wrong;