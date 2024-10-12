import React from 'react';

const Result = ({ winner }) => {
  return (
    <div style={{fontSize: '30px', fontWeight: '500', textWrap: 'wrap', maxWidth: '100%'}}>
        {winner} won the Game!
    </div>
  );
};

export default Result;