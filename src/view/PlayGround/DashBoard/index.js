import timer_img from '../../../asset/timer_img.png';
import life_img from '../../../asset/life_img.jpeg';
import './index.css';

const Timer = (props) => {
    const { lifetimeSeconds, life } = props;
    return (
        <div className="dashBoard-container">
            <div className="dashboard-item" style={{ padding: 4 }}>
                <img alt={'타이머 이미지'} className="timer-image" src={timer_img} />
                <h2 className="lifetime">00:{lifetimeSeconds < 10 ? `0${lifetimeSeconds}` : lifetimeSeconds}</h2>
            </div>
            <div className="dashboard-item">
                <img alt={'하트 이미지'} className="life-image" src={life_img} />
                <h2 className="life">X{life}</h2>
            </div>
        </div>
    );
};

export default Timer;
