import React from "react";

const ScoreRecord = (props) => {
    const { _strike, _ball, _out, trial, answer } = props;
    return (
        <div className="ScoreRecord-Container">
            <div>[{trial} 회]</div>
            {/* <div>입력값: {answer}</div> */}
            <div>스트라이크 : {_strike}</div>
            <div>볼 : {_ball}</div>
            <div>아웃 : {_out}</div>
        </div>
    )

}

export default ScoreRecord;
