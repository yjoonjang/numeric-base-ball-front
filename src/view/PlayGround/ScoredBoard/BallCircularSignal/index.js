import React from 'react';

const BallCircularSignal = (props) => {
    const { isLightOn } = props;
    return (
        <>
        {isLightOn === true ? <div className="ballBallLine-isLightOn"></div>: 
        <div className="ballBallLine"></div>}
        </>
    )
}

export default BallCircularSignal;