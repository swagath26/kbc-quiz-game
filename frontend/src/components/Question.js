import React from 'react';

const Question = ({ question }) => {
    return (
        <div>
            <h2>{question.question}</h2>
            <div>
                {question.options.map((option, index) => (
                    <button key={index} onClick={() => question.onAnswer(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;