import React from 'react';
import './index.css';
import CircularSignal from '../Components/CircularSignal';
import SymbolSign from '../Components/SymbolSign';

const ScoredBoard = (props) => {
    const { strike, ball, out, answerLength } = props;

    const operation = [...Array(answerLength).keys()].map((circularSignalIndex) => (
        <CircularSignal
            key={circularSignalIndex}
            isStrikeBallLightOn={strike > circularSignalIndex}
            isBallBallLightOn={ball > circularSignalIndex}
            isOutBallLightOn={out > circularSignalIndex}
            color="#16db1c"
        />
    ));

    return (
        <div className="signal-container">
            <SymbolSign />
            {operation}
        </div>
    );
};

export default ScoredBoard;
