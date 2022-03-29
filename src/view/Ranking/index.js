import './index.css';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import BackArrow from '../../asset/back-arrow.svg';
import { useCallback } from 'react';

export function Ranking() {
    const history = useHistory();
    const location = useLocation();
    const highestScore = location.state.highestScore;
    const highestScoreNicknameList = location.state.highestScoreNicknameList;
    const secondHighestScore = location.state.secondHighestScore;
    const secondHighestScoreNicknameList = location.state.secondHighestScoreNicknameList;
    const thirdHighestScore = location.state.thirdHighestScore;
    const thirdHighestScoreNicknameList = location.state.thirdHighestScoreNicknameList;

    const onBackButtonClick = useCallback(() => {
        history.goBack();
    }, [history]);

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const highestScoreNicknameListLength = highestScoreNicknameList.length;
    const secondHighestScoreNicknameListLength = secondHighestScoreNicknameList.length;
    // const thirdHighestScoreNicknameListLength = thirdHighestRankList;

    const highestRankList = highestScoreNicknameList.map((highestScoreNickname, index) => (
        <div className=" w-full h-full flex flex-col items-center justify-center mt-8">
            <div className=" width-big text-2xl mb-8 flex justify-center space-x-10">
                {/* <div className="rank-space">1</div> */}
                <div className=" nickname-score-space">{highestScoreNickname}</div>
                <div>{highestScore}</div>
            </div>
            <div className="division-line"></div>
        </div>
    ));

    const secondHighestRankList = secondHighestScoreNicknameList.map((secondHighestScoreNickname, index) => (
        <div className=" w-full h-full flex flex-col items-center justify-center mt-8">
            <div className="width-big text-2xl mb-8 flex justify-center space-x-10">
                {/* <div className="rank-space">2</div> */}
                <div className="nickname-score-space">{secondHighestScoreNickname}</div>
                <div>{secondHighestScore}</div>
            </div>
            <div className="division-line"></div>
        </div>
    ));

    const thirdHighestRankList = thirdHighestScoreNicknameList.map((thirdHighestScoreNickname, index) => (
        <div className=" w-full h-full flex flex-col items-center justify-center mt-8">
            <div className="width-big text-2xl mb-8 flex justify-center space-x-10">
                {/* <div className="rank-space">3</div> */}
                <div className="nickname-score-space">{thirdHighestScoreNickname}</div>
                <div>{thirdHighestScore}</div>
            </div>
            <div className="division-line"></div>
        </div>
    ));

    return (
        <div className="h-full justify-center items-center">
            <div className="ranking-container text-4xl font-bold text-white">High Scores</div>
            <div className="ranking-place overflow-y-scroll border-2 drop-shadow-lg ">
                <div className="w-full flex flex-col ranking-font">
                    <div>{highestRankList}</div>
                    <div>{secondHighestRankList}</div>
                    <div>{thirdHighestRankList}</div>
                </div>
            </div>
            <button className="home-circle-button" onClick={onHomeButtonClick}>
                Home
            </button>
        </div>
    );
}
