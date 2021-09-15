import React from 'react';

const ScoreRecord = (props) => {
    const { strike, ball, out, trial, guess } = props;
    return (
        <div className="scoreRecord-container">
            <div>[{trial} 회]</div>
            <div>입력값: {guess}</div>
            <div>S : {strike}</div>
            <div>B : {ball}</div>
            <div>O : {out}</div>
        </div>
    );
};

export default ScoreRecord;
