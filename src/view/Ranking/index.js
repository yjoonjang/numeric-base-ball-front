import './index.css';
import { useLocation } from 'react-router';

export function Ranking() {
    const location = useLocation();
    const highestScore = location.state.highestScore;
    const highestScoreNicknameList = location.state.highestScoreNicknameList;
    const secondHighestScore = location.state.secondHighestScore;
    const secondHighestScoreNicknameList = location.state.secondHighestScoreNicknameList;
    const thirdHighestScore = location.state.thirdHighestScore;
    const thirdHighestScoreNicknameList = location.state.thirdHighestScoreNicknameList;
    console.log(highestScoreNicknameList);

    return (
        <div className="Ranking-container">
            <div className="Ranking-form flex-column">
                <h1 style={{ marginTop: 100 }}>명예의 전당</h1>
                <div className="Ranking-spot flex-column">
                    <div>
                        {highestScore} : {highestScoreNicknameList}
                    </div>
                    <div>
                        {secondHighestScore} : {secondHighestScoreNicknameList}
                    </div>
                    <div>
                        {thirdHighestScore} : {thirdHighestScoreNicknameList}
                    </div>
                </div>
            </div>
        </div>
    );
}
