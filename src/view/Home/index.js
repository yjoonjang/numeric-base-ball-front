import { useHistory } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Login from '../Login';

const Home = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['data']);

    useEffect(() => {
        // axios.get('http://localhost:65100/user').then((res) => {
        //     const result = res.data;
        //     console.log(result);
        //     if (result.length > 0) {
        //         setUser(result[0]);
        //     } else {
        //         setUser(null);
        //     }
        // });
        // return;
    }, []);

    const onLogout = () => {
        removeCookie('data');
        alert('로그아웃 되었습니다.');
    };
    const history = useHistory();
    const onGameStartButtonClick = useCallback(() => {
        history.push('/Play-ground');
    });
    const onCreateAccount = useCallback(() => {
        history.push('/Create-Account');
    });
    const onLogin = useCallback(() => {
        history.push('/Login');
    });

    return (
        <div className="container flex-column">
            <div className="game-name">숫자 야구</div>
            {!cookies.data ? (
                <button className="game-start-button" onClick={onGameStartButtonClick}>
                    비로그인으로 게임 시작
                </button>
            ) : (
                <button className="game-start-button" onClick={onGameStartButtonClick}>
                    {cookies.data.nickname}님의 게임 시작
                </button>
            )}
            <div className="flex Join-Login-btn" style={{ marginTop: -16 }}>
                <button className="game-start-button" onClick={onCreateAccount}>
                    회원가입
                </button>
                <button className="game-start-button" onClick={onLogin}>
                    로그인
                </button>
                <button className="game-start-button" onClick={onLogout}>
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default Home;
