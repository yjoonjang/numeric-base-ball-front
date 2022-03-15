import timer_img from '../../../asset/timer_img.png';
import life_img from '../../../asset/life_img.jpeg';
import './index.css';
import styled from 'styled-components';

const Timer = (props) => {
    const { lifetimeSeconds, life } = props;
    const prgoressTime = `${(lifetimeSeconds / 59) * 100}%`;
    const ProgressBar = styled.div`
        width: ${prgoressTime};
        height: 100%;
        background-color: black;
        position: absolute;
    `;

    return (
        <div>
            <div className="dashBoard-container">
                <div>
                    <div class="flex justify-between w-52">
                        <span class="text-xl font-medium text-black">Time</span>
                        <h2 className="lifetime text-xl font-medium text-black">
                            00:{lifetimeSeconds < 10 ? `0${lifetimeSeconds}` : lifetimeSeconds}
                        </h2>
                    </div>
                    <div class=" pt-1 h-4 relative rounded-full ">
                        <div class="w-full h-full bg-gray-300 absolute"></div>
                        <ProgressBar />
                    </div>
                </div>
                <div className="dashboard-item">
                    <img alt={'하트 이미지'} className="life-image" src={life_img} />
                    <h2 className="life text-xl font-semibold">X{life}</h2>
                </div>
            </div>
        </div>
    );
};

export default Timer;
