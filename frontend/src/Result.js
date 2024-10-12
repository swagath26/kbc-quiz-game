import React from 'react';
import { Fireworks } from './Animations';

const Result = ({ winner }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
      <div style={{position: 'absolute', width: 'min(720px, 200vw)', overflow: 'hidden', top: -100}}><Fireworks /></div>
      <div style={{fontSize: '24px', fontWeight: '500', textWrap: 'wrap', maxWidth: '100%', paddingBlock: '1em', textAlign: 'center'}}>
          {winner} is the Winner!
      </div>
    </div>
  );
};

export default Result;