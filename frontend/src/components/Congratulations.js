import React from 'react';
import useCountDown from '../hooks/useCountDown';
import { SuccessReaction } from './Animations';

const Congratulations = ({ name, answer, gameEnded, self=false }) => {
    const counter = useCountDown();
    
    return (
        <>
        {self ? <div style={{display: 'flex', flexDirection: 'column', gap: '1em', textAlign: 'center', fontWeight: '400', alignItems: 'center'}}>
                        <SuccessReaction />
                        <div style={{fontSize: '20px'}}>Right Answer!</div>
                      </div> : <></>}
        <div className='wrong' style={{display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
            <div style={{maxWidth: '20em', backgroundColor: '#004400', color: '#eeeeee', padding: '2em 2em', borderRadius: '25px', textAlign: 'center'}}>
                Congratulations {name}! The right answer is {answer}
            </div>
            <div style={{flexGrow: 1, fontSize: '20px', fontWeight: '500', textAlign: 'center'}}>
            {gameEnded ? 'Game Over! Results' : 'Next Question'} in {counter} seconds!
            </div>
        </div>
        </>
    );
};

export default Congratulations;