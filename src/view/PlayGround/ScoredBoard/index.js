import React from 'react';
import { useState } from 'react'; 
import BallCircularSignal from './BallCircularSignal';
import StrikeCircularSignal from './StrikeCircularSignal'
import OutCircularSignal from './OutCircularSignal';
import ScoreRecord from './ScoreRecord';

const ScoredBoard = (props) => {
    const { strike, ball, out, roundHistories } = props;
    
    const StrikeOperation = [...Array(4).keys()].map((circularSignalIndex) => <StrikeCircularSignal key={circularSignalIndex} 
    isLightOn={strike > circularSignalIndex}
    />)
    const BallOperation = [...Array(4).keys()].map((circularSignalIndex) => <BallCircularSignal key={circularSignalIndex} 
    isLightOn={ball > circularSignalIndex}
    />)
    const OutOperation = [...Array(4).keys()].map((circularSignalIndex) => <OutCircularSignal key={circularSignalIndex} 
    isLightOn={out > circularSignalIndex}
    />)
    const ScoreRecordOperation = roundHistories.map((rounds,index)=> 
        <ScoreRecord key = {index} _strike = {rounds._strike} _out = {rounds._out} _ball = {rounds._ball} trial = {index + 1} />)
        
    // <strikeBallLine key={0} isLightOn={out > 0} color="#208080" /> 1번째 원에 불 들어옴
    // <strikeBallLine key={1} isLightOn={out > 1} color="#208080" /> 1,2번째 원에 불 들어옴
    // <strikeBallLine key={2} isLightOn={out > 2} color="#208080" /> 1,2,3 번째 원에 불 들어옴
    return (
        <div>
            <div className="strike-operation-line">
                <h2>S:</h2>
                {StrikeOperation}
            </div>
            <div className="ball-operation-line">
                <h2>B:</h2>
                {BallOperation}
            </div>
            <div className="out-operation-line">
                <h2>O:</h2>
                {OutOperation}
            </div>
            {ScoreRecordOperation}
        </div>

    )
}

export default ScoredBoard;
