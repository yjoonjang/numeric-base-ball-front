import DashBoard from './DashBoard';
import UserPanel from './UserPanel';
import ScoredBoard from './ScoredBoard';
import { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import './index.css';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const maxLifeTimeSeconds = 59;
const maxLife = 100;
const PlayGround = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['data']);
    const [answerLength] = useState(4);
    const [answer, setAnswer] = useState('');
    const [lifetimeSeconds, setLifetimeSeconds] = useState(maxLifeTimeSeconds);
    const [life, setLife] = useState(maxLife);
    const [strike, setStrike] = useState(0);
    const [ball, setBall] = useState(0);
    const [out, setOut] = useState(0);
    const [roundHistories, setRoundHistories] = useState([]);
    const [rankHistories, setRankHistories] = useState([]);
    // const [finalScore, setFinalScore] = useState(1000);
    const finalScore = life * 10;
    const [currentNickname, setCurrentNickname] = useState();
    const history = useHistory();

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

    const addRankHistory = useCallback(
        (results) => {
            const ret = { ...rankHistories, results };
            setRankHistories(ret);
            return ret;
        },
        [rankHistories]
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
        // window.addEventListener('input', (event) => {
        //     let guess = event.target.value;
        //     if (answer === guess) {
        //         const results = { finalScore: finalScore, currentNickname: currentNickname };
        //         // rankHistories.concat({ ...rankHistories, finalScore, currentNickname });
        //         setRankHistories((rankHistories) => [...rankHistories, results]);
        //         console.log(rankHistories);
        //     }
        // });
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

    const getScore = (guess, answer) => {
        let _strike = 0;
        let _ball = 0;
        let _out = 0;

        for (let answerIndex = 0; answerIndex < guess.length; answerIndex++) {
            if (answer[answerIndex] === guess[answerIndex]) {
                _strike += 1;
            } else if (guess.includes(answer[answerIndex])) {
                _ball += 1;
            } else {
                _out += 1;
            }
        }

        return { strike: _strike, ball: _ball, out: _out };
    };

    const setRank = useCallback(() => {
        // const rankList = [];
        // console.log(newRankHistories);
        // for (let rankIndex = 0; rankIndex <= rankHistories.length; rankIndex += 1) {
        //     rankList.push(rankHistories[rankIndex].results.finalScore);
        // }
        // const rank1 = Math.max(rankList);
        // const rank1NickName = rankHistories[rankList.indexOf(rank1)].results.nickname;
        // const rank2 = Math.max(rankList.pop(rank1));
        // const rank2NickName = rankHistories[rankList.indexOf(rank2)].results.nickname;
        // const rank3 = Math.max(rankList.pop(rank1, rank2));
        // const rank3NickName = rankHistories[rankList.indexOf(rank3)].results.nickname;
        // rankList.pop(rank3);
        // return {
        //     rank1: rank1,
        //     rank1NickName: rank1NickName,
        //     rank2: rank2,
        //     rank2NickName: rank2NickName,
        //     rank3: rank3,
        //     ran3kNickName: rank3NickName,
        // };
    }, []);

    // const getRank = rankHistories.map((rounds) => {
    //     return {
    //         finalScore: rounds.finalScore,
    //         nickname: rounds.nickname,
    //     };
    // });

    const handleKeyPress = useCallback(
        (event) => {
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
                    axios
                        .post('http://localhost:65100/rank', {
                            finalScore: finalScore,
                            currentNickname: currentNickname,
                        })
                        .then((res) => {
                            const {
                                highestScore,
                                highestScoreNicknameList,
                                secondHighestScore,
                                secondHighestScoreNicknameList,
                                thirdHighestScore,
                                thirdHighestScoreNicknameList,
                            } = res.data;

                            console.log(highestScoreNicknameList);

                            if (window.confirm('홈런! 게임을 한판 더 하시겠습니까?') === true) {
                                history.go();
                            } else {
                                history.push({
                                    pathname: '/End',
                                    state: {
                                        finalScore: finalScore,
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
                } else {
                    const { strike, ball, out } = getScore(guess, answer);

                    setStrike(strike);
                    setBall(ball);
                    setOut(out);
                    decreaseLife();
                    resetLifeTime();
                    addRoundHistory({
                        strike,
                        ball,
                        out,
                        guess,
                    });
                    // console.log(newRoundHistories);
                }
            }
        },
        [decreaseLife, answer, life, finalScore]
    );

    const scoreRecordOperation = roundHistories.map((rounds, index) => (
        <div className="scoreRecord-container">
            <div>[{index + 1} 회]</div>
            <div>입력값: {rounds.guess}</div>
            <div>S : {rounds.strike}</div>
            <div>B : {rounds.ball}</div>
            <div>O : {rounds.out}</div>
        </div>
    ));

    return (
        <div className="container">
            <div className="container game-section flex-column">
                <DashBoard life={life} lifetimeSeconds={lifetimeSeconds} />
                <UserPanel answerLength={answerLength} handleKeyPress={handleKeyPress} />
                <ScoredBoard strike={strike} ball={ball} out={out} answerLength={answerLength} />
            </div>
            <div className="flex-column">{scoreRecordOperation}</div>
        </div>
    );
};

export default PlayGround;
