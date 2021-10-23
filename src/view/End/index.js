import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import './index.css';

const End = () => {
    const history = useHistory();

    const onHomeButtonClick = useCallback(() => {
        history.push('/');
    });

    return (
        <div className="container flex-column">
            <h1>게임 종료</h1>
            <button className="go-home-button" onClick={onHomeButtonClick}>
                다시 시작
            </button>
        </div>
    );
};

export default End;
