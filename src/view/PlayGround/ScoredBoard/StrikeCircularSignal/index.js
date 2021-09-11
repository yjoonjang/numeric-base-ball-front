import React from 'react';

const StrikeCircularSignal = (props) => {
    const { isLightOn } = props;
    return (
        <>
        {isLightOn === true ? <div className="strikeBallLine-isLightOn"></div> : 
        <div className="strikeBallLine"></div>}
        </>
    )
}

export default StrikeCircularSignal;