import React, { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';
import './index.css';
import { ScorePage } from '../PlayGround/Components/ScorePage';
import { useLocation } from 'react-router';

const End = (props) => {
    const location = useLocation();
    const finalScore = location.state.finalScore;
    const nickname = location.state.nickname;
    const highestScore = location.state.highestScore;
    const highestScoreNicknameList = location.state.highestScoreNicknameList;
    const secondHighestScore = location.state.secondHighestScore;
    const secondHighestScoreNicknameList = location.state.secondHighestScoreNicknameList;
    const thirdHighestScore = location.state.thirdHighestScore;
    const thirdHighestScoreNicknameList = location.state.thirdHighestScoreNicknameList;

    const history = useHistory();

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const onGameStartButtonClick = useCallback(() => {
        history.push('/Play-ground');
    }, [history]);

    const onWatchRankingButtonClick = useCallback(() => {
        history.push({
            pathname: '/Ranking',
            state: {
                nickname: nickname,
                highestScore: highestScore,
                highestScoreNicknameList: highestScoreNicknameList,
                secondHighestScore: secondHighestScore,
                secondHighestScoreNicknameList: secondHighestScoreNicknameList,
                thirdHighestScore: thirdHighestScore,
                thirdHighestScoreNicknameList: thirdHighestScoreNicknameList,
            },
        });
    });

    return (
        <div className="container flex-column">
            <h1>게임 종료</h1>
            <h2>
                {nickname}님의 최종 스코어 : {finalScore}
            </h2>
            <button className="go-ranking-button" style={{ marginBottom: 20 }} onClick={onWatchRankingButtonClick}>
                랭킹 보기
            </button>
            <div>
                <button className="end-page-button" onClick={onHomeButtonClick}>
                    홈으로 돌아가기
                </button>
                <button className="end-page-button" onClick={onGameStartButtonClick}>
                    다시 플레이하기
                </button>
            </div>
        </div>
    );
};
export default End;
