import react from 'react';

const CircularSignal = (props) => {
    const { isStrikeBallLightOn, isBallBallLightOn, isOutBallLightOn, color } = props;

    return (
        <div>
            <div>
                {isStrikeBallLightOn === true ? (
                    <div className="ball border-color-black" style={{ backgroundColor: color }}></div>
                ) : (
                    <div className="ball border-color-black"></div>
                )}
            </div>
            <div>
                {isBallBallLightOn === true ? (
                    <div className="ball border-color-blue" style={{ backgroundColor: color }}></div>
                ) : (
                    <div className="ball border-color-blue"></div>
                )}
            </div>
            <div>
                {isOutBallLightOn === true ? (
                    <div className="ball border-color-red" style={{ backgroundColor: color }}></div>
                ) : (
                    <div className="ball border-color-red"></div>
                )}
            </div>
        </div>
    );
};

export default CircularSignal;
