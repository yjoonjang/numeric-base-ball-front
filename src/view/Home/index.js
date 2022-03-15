import { useHistory } from 'react-router-dom';
import { useCallback, useState, useEffect, useMemo } from 'react';
import './index.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Login from '../Login';

const Home = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['data']);
    const [answerLength, setAnswerLength] = useState(4);
    const [level, setLevel] = useState('');

    const handleClickEasyRadioButton = useCallback(() => {
        setLevel('easy');
        setAnswerLength(3);
    }, [level]);

    const handleClickMediumRadioButton = useCallback(() => {
        setLevel('medium');
        setAnswerLength(4);
    }, [level]);

    const handleClickHardRadioButton = useCallback(() => {
        setLevel('hard');
        setAnswerLength(5);
    }, [level]);

    const onLogout = () => {
        removeCookie('data');
        alert('로그아웃 되었습니다.');
    };

    const history = useHistory();
    const onCreateAccount = useCallback(() => {
        history.push('/Create-Account');
    });
    const onLogin = useCallback(() => {
        history.push('/Login');
    });
    const onGameStartButtonClick = useCallback(() => {
        axios.post('http://localhost:65100/ticket', { id: cookies.data.id });
        history.push({ pathname: '/Play-ground', state: { answerLength: answerLength } });
    });

    return (
        <div>
            <div className="flex flex-col justify-center items-center w-full h-full">
                <div className=" flex flex-col font-bold text-8xl">
                    <div className="pt-4">Numeric Baseball</div>
                    {/* <div>Baseball</div> */}
                </div>
                <div className="justify-center items-center space-y-8 ">
                    <div className="pt-20 text-2xl">
                        {!cookies.data ? (
                            <button className="game-start-button" onClick={onGameStartButtonClick}>
                                비로그인으로 게임 시작
                            </button>
                        ) : (
                            <button className="game-start-button" onClick={onGameStartButtonClick}>
                                {cookies.data.nickname}님의 게임 시작
                            </button>
                        )}
                    </div>
                    <div>
                        {!cookies.data ? (
                            <div>
                                <div className="flex flex-col">
                                    <button className="game-start-button" onClick={onLogin}>
                                        로그인
                                    </button>
                                </div>
                                <div>
                                    <button className="game-start-button" onClick={onCreateAccount}>
                                        회원가입
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button className="game-start-button" onClick={onLogout}>
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </div>
                    <div className=" flex space-x-3 items-center justify-center">
                        <div>
                            <label htmlFor="easy">쉬움</label>
                            <input
                                type="radio"
                                name="radio"
                                id="easy"
                                value="easy"
                                checked={level === 'easy'}
                                onClick={handleClickEasyRadioButton}
                            />
                        </div>
                        <div>
                            <label htmlFor="medium">중간</label>
                            <input
                                type="radio"
                                name="radio"
                                id="medium"
                                value="medium"
                                checked={level === 'medium'}
                                onClick={handleClickMediumRadioButton}
                            />
                        </div>
                        <div>
                            <label htmlFor="hard">어려움</label>
                            <input
                                type="radio"
                                name="radio"
                                id="hard"
                                value="hard"
                                defaultChecked={level === 'hard'}
                                onClick={handleClickHardRadioButton}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
