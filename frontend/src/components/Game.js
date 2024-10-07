import React from 'react';
import Question from './Question';

const Game = ({ question, onAnswer }) => {
    if (!question) return null;

    return (
        <div>
            <h2>{question.question}</h2>
            <div>
                {question.options.map((option, index) => (
                    <button key={index} onClick={() => onAnswer(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Game;