import React from 'react';
import { useHistory } from "react-router-dom";
import { useCallback } from 'react';
import './index.css';

const Home = () => {
    const history = useHistory();

    const onGameStartButtonClick = useCallback(() => {
        history.push('/Play-ground')
    },[]);
        return (
            <div className="container flex-column">
                <h1 className>숫자 야구</h1>
                <button 
                    className="game-start-button" 
                    onClick={onGameStartButtonClick}>
                    게임 시작
                </button>
            </div>
    )
}

export default Home;