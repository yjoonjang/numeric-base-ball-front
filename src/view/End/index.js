import React, { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';
import './index.css';
import { ScorePage } from '../PlayGround/Components/ScorePage';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router';
import axios from 'axios';

const End = (props) => {
    const location = useLocation();
    const finalScore = location.state.finalScore;
    const gamePlayTime = location.state.gamePlayTime;
    const nickname = location.state.nickname;
    const answerLength = location.state.answerLength;
    const highestScore = location.state.highestScore;
    const highestScoreNicknameList = location.state.highestScoreNicknameList;
    const secondHighestScore = location.state.secondHighestScore;
    const secondHighestScoreNicknameList = location.state.secondHighestScoreNicknameList;
    const thirdHighestScore = location.state.thirdHighestScore;
    const thirdHighestScoreNicknameList = location.state.thirdHighestScoreNicknameList;

    console.log(gamePlayTime);
    const history = useHistory();

    const [cookies, setCookie, removeCookie] = useCookies(['data']);

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const onGameStartButtonClick = useCallback(() => {
        axios.post('http://localhost:65100/ticket', { id: cookies.data.id });
        history.push({ pathname: '/Play-ground', state: { answerLength: answerLength } });
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
        <div className=" game-result-board flex flex-column justify-center items-center ">
            {/* <div>게임 결과</div> */}
            <div className=" text-3xl font-bold mb-20">{nickname}님의 게임 결과</div>
            <div className="flex space-x-4 text-xl mb-8">
                <div className="flex flex-col items-center ">
                    <div>최종 스코어:</div>
                    <div>플레이 시간:</div>
                </div>
                <div className="flex flex-col items-center">
                    <div>{finalScore}점</div>
                    <div>{gamePlayTime}</div>
                </div>
            </div>
            <button className="go-ranking-button" onClick={onWatchRankingButtonClick}>
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
