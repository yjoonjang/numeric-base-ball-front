import React from 'react';
import { useState } from 'react';
import ScoreRecord from './ScoreRecord';
import './index.css';
import CircularSignal from './CircularSignal';
import BallLine from './BallLine';

const ScoredBoard = (props) => {
    const { strike, ball, out, roundHistories, answerLength } = props;

    const operation = [...Array(answerLength).keys()].map((circularSignalIndex) => (
        <CircularSignal
            key={circularSignalIndex}
            isStrikeBallLightOn={strike > circularSignalIndex}
            isBallBallLightOn={ball > circularSignalIndex}
            isOutBallLightOn={out > circularSignalIndex}
            color="#9acd32"
        />
    ));

    const scoreRecordOperation = roundHistories.map((rounds, index) => (
        <ScoreRecord
            key={index}
            strike={rounds.strike}
            out={rounds.out}
            ball={rounds.ball}
            guess={rounds.guess}
            trial={index + 1}
        />
    ));

    return (
        <div>
            <div className="signal-container">
                <BallLine />
                {operation}
            </div>
            <div className="scoreRecord-align">{scoreRecordOperation}</div>
        </div>
    );
};

export default ScoredBoard;
