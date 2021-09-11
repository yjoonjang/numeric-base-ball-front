import React from 'react';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css'

const UserPanel = (props) => {
    const { answer, setStrike, setBall, setOut, decreaseLife, addRoundHistory, history, digits } = props;
    // const stringifyAnswer = answer.join('');
    
    const handleKeyPress = useCallback((event) => {
        let guess = event.target.value;
        
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
        }

        const checkIfProperLengthGuess = (guess) => guess.length === answer.length

        const getScore = (guess, answer) => {
            let _strike = 0; let _ball = 0; let _out = 0;

            for (let answerIndex = 0; answerIndex < guess.length; answerIndex++) {
                if (answer[answerIndex] === guess[answerIndex]) {
                    _strike += 1;
                }
                else if (guess.includes(answer[answerIndex])) {
                    _ball += 1;
                }
                else {
                    _out += 1;
                }
            }
            return (_strike, _ball, _out)
        }

        if (event.keyCode === 13) {
            try {
                if (!checkIfDuplicateGuess(guess)) {
                    throw Error("중복된 값을 입력하셨습니다. 다시 입력해주세요.");
                }

                if (!checkIfProperLengthGuess(guess)) {
                    throw Error(`${digits}자리 숫자를 입력해 주십시오`);
                }
            } catch (error) {
                alert(error);
                event.target.guess = "";
                return;
            }

            if (answer === guess) {
                if (window.confirm("홈런! 게임을 한판 더 하시겠습니까?") === true) {
                    history.go(0);
                } else {history.push('/End');}
            }
            else {
                const { _strike, _ball, _out } = getScore(guess, answer);

                setStrike(_strike);
                setBall(_ball);
                setOut(_out);

                decreaseLife();
                addRoundHistory({
                    _strike, _ball, _out, guess
                 })
                event.target.guess = ''
            }
        };
    },[decreaseLife, answer])

    const onUserGuessInput = useCallback ((event) => {
        const LengthLimit = (event) => {
            if (event.target.value.length > event.target.maxLength) {
                event.target.value = event.target.value.slice(0, event.target.maxLength);
            }
        }
        return (LengthLimit(event))
    },[]);


    return (
        <div>
            <input
                className= "userpanel-container"
                type="number"
                maxLength="4"        
                onInput={onUserGuessInput}
                onKeyDown={handleKeyPress}
            />
        </div>
        )
}

export default UserPanel;