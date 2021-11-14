import React, { createContext } from 'react';
import { useHistory } from 'react-router';
import { useCallback } from 'react';
import './index.css';

export function ScorePage(props) {
    const history = useHistory();
    const { finalScore, life } = props;

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    }, [history]);

    const onGameStartButtonClick = useCallback(() => {
        history.push('/Play-ground');
    }, [history]);

    return (
        <div className="container flex-column">
            <h1>게임 종료</h1>
            <h2>최종 스코어 : {finalScore}</h2>
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
}
