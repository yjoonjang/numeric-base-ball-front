import DashBoard from './DashBoard';
import UserPanel from './UserPanel';
import ScoredBoard from './ScoredBoard';
import { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import './index.css';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { data } from 'autoprefixer';
import { set } from 'js-cookie';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const maxLifeTimeSeconds = 59;
const maxLife = 100;
const PlayGround = (event) => {
    const [cookies, setCookie, removeCookie] = useCookies(['data']);
    const [answer, setAnswer] = useState('');
    const [lifetimeSeconds, setLifetimeSeconds] = useState(maxLifeTimeSeconds);
    const [life, setLife] = useState(maxLife);
    const [strike, setStrike] = useState(0);
    const [ball, setBall] = useState(0);
    const [out, setOut] = useState(0);
    const [roundHistories, setRoundHistories] = useState([]);
    const [rankHistories, setRankHistories] = useState([]);
    const finalScore = life * 10;
    const [currentNickname, setCurrentNickname] = useState();
    const [gamePlayTime, setGamePlayTime] = useState('');
    const history = useHistory();
    const location = useLocation();

    const answerLength = location.state.answerLength;

    useEffect(() => {
        if (!cookies.data) {
            setCurrentNickname('UNDEFINED');
        } else {
            setCurrentNickname(cookies.data.nickname);
        }
    });

    //초기화
    useEffect(() => {
        const countdownHandler = setInterval(() => {
            setLifetimeSeconds((lifetimeSeconds) => lifetimeSeconds - 1);
        }, 1000);
        setAnswer(generateAnswer());
        return () => clearInterval(countdownHandler);
    }, []);

    //라이프타임을 모두 소진했을때
    useEffect(() => {
        if (lifetimeSeconds <= 0) {
            setLifetimeSeconds(maxLifeTimeSeconds);
            decreaseLife();
            resetLifeTime();
        }
    }, [lifetimeSeconds, life]);

    //랜덤으로 답 생성
    const generateAnswer = useMemo(() => () => {
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        const answer = [];
        for (let answerIndex = 0; answerIndex < answerLength; answerIndex++) {
            let select = Math.floor(Math.random() * arr.length);
            answer[answerIndex] = arr.splice(select, 1)[0];
            console.log('generated answer', answer.join(''));
        }
        return answer.join('');
    });

    const decreaseLife = useCallback(() => {
        setLife(parseInt(life) - 1);
    }, [life]);

    const resetLifeTime = useCallback(() => {
        setLifetimeSeconds(maxLifeTimeSeconds);
    }, []);

    const addRoundHistory = useCallback(
        (result) => {
            setRoundHistories(roundHistories.concat(result));
            return;
        },
        [roundHistories]
    );

    useEffect(() => {
        if (life <= 0) {
            if (
                window.confirm('기회를 다 사용하셨습니다. 정답은 ' + answer + ' 입니다. 다시 플레이 하시겠습니까?') ===
                true
            ) {
                history.go(0);
            } else {
                history.push('/End');
            }
        }
    }, [life, rankHistories]);

    const checkIfDuplicateGuess = (guess) => {
        for (let guessIndex = 0; guessIndex < guess.length; guessIndex++) {
            let focus_ch = guess[guessIndex];
            for (let nextGuessIndex = guessIndex + 1; nextGuessIndex < guess.length; nextGuessIndex++) {
                if (guess[nextGuessIndex].includes(focus_ch)) {
                    return false;
                }
            }
        }
        return true;
    };

    const checkIfProperLengthGuess = (guess) => guess.length === answer.length;

    const handleKeyPress = useCallback(
        (event) => {
            let playTime;
            let guess = event.target.value;
            if (event.keyCode === 13) {
                event.target.value = '';
                try {
                    if (!checkIfDuplicateGuess(guess)) {
                        throw Error('중복된 값을 입력하셨습니다. 다시 입력해주세요.');
                    }

                    if (!checkIfProperLengthGuess(guess)) {
                        throw Error(`${answerLength}자리 숫자를 입력해 주십시오`);
                    }
                } catch (error) {
                    alert(error);
                    return;
                }
                if (answer === guess) {
                    // 총 게임한 시간 구하기
                    axios
                        .post('http://localhost:65100/gameEnd', { id: cookies.data.id, score: finalScore })
                        .then((res) => {
                            const { RUN_TIME } = res.data[0];
                            playTime = `${RUN_TIME}초`;
                        });

                    // 랭킹 구하기
                    axios
                        .post('http://localhost:65100/rank')
                        .then((res) => {
                            const {
                                highestScore,
                                highestScoreNicknameList,
                                secondHighestScore,
                                secondHighestScoreNicknameList,
                                thirdHighestScore,
                                thirdHighestScoreNicknameList,
                            } = res.data;
                            console.log(res.data);
                            // console.log(highestScore);

                            if (window.confirm('홈런! 게임을 한판 더 하시겠습니까?') === true) {
                                history.go();
                            } else {
                                history.push({
                                    pathname: '/End',
                                    state: {
                                        finalScore: finalScore,
                                        gamePlayTime: playTime,
                                        answerLength: answerLength,
                                        nickname: currentNickname,
                                        highestScore: highestScore,
                                        highestScoreNicknameList: highestScoreNicknameList,
                                        secondHighestScore: secondHighestScore,
                                        secondHighestScoreNicknameList: secondHighestScoreNicknameList,
                                        thirdHighestScore: thirdHighestScore,
                                        thirdHighestScoreNicknameList: thirdHighestScoreNicknameList,
                                    },
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    // 정답이 아닐 경우
                } else {
                    axios
                        .post('http://localhost:65100/game', {
                            id: cookies.data.id,
                            nickname: currentNickname,
                            answer: answer,
                            guess: guess,
                        })
                        .then((res) => {
                            // const index = res.data.length;
                            const { guess, strike_count, ball_count, out_count } = res.data[0];
                            setStrike(strike_count);
                            setBall(ball_count);
                            setOut(out_count);
                            decreaseLife();
                            resetLifeTime();
                            addRoundHistory({
                                strike_count,
                                ball_count,
                                out_count,
                                guess,
                            });
                        });
                }
            }
        },
        [decreaseLife, answer, life, finalScore, addRoundHistory]
    );

    const scoreRecordOperation = roundHistories.map((rounds, index) => (
        <div className="scoreRecord-container">
            <div>[{index + 1} 회]</div>
            <div>입력값: {rounds.guess}</div>
            <div>Strike : {rounds.strike_count}</div>
            <div>Ball : {rounds.ball_count}</div>
            <div>Out : {rounds.out_count}</div>
        </div>
    ));

    return (
        <div className="playground-container align-middle justify-center ">
            <div className="playground-container game-section flex-column">
                <DashBoard life={life} lifetimeSeconds={lifetimeSeconds} />
                <UserPanel answerLength={answerLength} handleKeyPress={handleKeyPress} />
                <ScoredBoard strike={strike} ball={ball} out={out} answerLength={answerLength} />
            </div>
            <div className="score-record-operation-container border-4 rounded-2xl border-black ">
                <div className="score-record-operation font-medium pt-3 ">{scoreRecordOperation}</div>
            </div>
        </div>
    );
};

export default PlayGround;
