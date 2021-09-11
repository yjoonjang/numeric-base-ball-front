import React from 'react';

const OutCircularSignal = (props) => {
    const { isLightOn } = props;
    return (
        <>
        {isLightOn === true ? <div className="outBallLine-isLightOn"></div>: 
        <div className="outBallLine"></div> }
        </>
    )
}

export default OutCircularSignal;