// import timer_img from '..../asset';
// import life_img from '../../asset';
import DashBoard from './DashBoard';
import UserPanel from './UserPanel';
import ScoredBoard from './ScoredBoard';
import { useState, useEffect, useCallback, useMemo } from 'react';
import './index.css'
import ScoreRecord from './ScoredBoard/ScoreRecord';
import { useHistory } from 'react-router-dom';

const maxLifeTimeSeconds = 59;
const maxLife = 100;
const PlayGround = () => {
    const [answerLength] = useState(4);
    const [answer, setAnswer] = useState('');
    const [lifetimeSeconds,setLifetimeSeconds] = useState(maxLifeTimeSeconds);
    const [life,setLife] = useState(maxLife);
    const [strike, setStrike] = useState(0);
    const [ball, setBall] = useState(0);
    const [out, setOut] = useState(0);
    const [roundHistories,setRoundHistories] = useState([]);
    const history = useHistory()

    const generateAnswer = useMemo(() => 
    () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const answer = [];
    for (var i = 0; i < answerLength; i++) {
        let select = Math.floor(Math.random() * arr.length)
        answer[i] = arr.splice(select, 1)[0]
        console.log(answer)
    };
    return answer.join('')

    })

    //초기화
    useEffect(() => {
        const countdownHandler = setInterval(() => {
          setLifetimeSeconds((lifetimeSeconds) => lifetimeSeconds - 1)  
        },1000)
        setAnswer(generateAnswer());
        return() => clearInterval(countdownHandler);
      },[lifetimeSeconds]);

    //라이프타임을 모두 소진했을때
    useEffect(() => {
      if (lifetimeSeconds <= 0) {
        setLifetimeSeconds(maxLifeTimeSeconds);
        decreaseLife();
        resetLifetime();
      }
    },[lifetimeSeconds, life])

    const decreaseLife = useMemo(() => 
      () => {
        setLife(parseInt(life) - 1);
    },[life])

    const resetLifetime = useMemo(() => 
      () => {
        setLifetimeSeconds(maxLifeTimeSeconds);
    },[])

    const addRoundHistory = useMemo(() =>
      (result) => {
      setRoundHistories(roundHistories.concat(result));
      console.log(result);
    },[roundHistories]) 

    useEffect (()=> {
      if (life <= 0) {
          if (window.confirm("기회를 다 사용하셨습니다. 정답은 " + answer.join('') + " 입니다. 다시 플레이 하시겠습니까?") === true) {
              history.go(0);
          } else {
              history.push('/End');
              }
      }   
    },[life])



    return (
    <div className="container">
        <div className="container game-section flex-column">
            <DashBoard 
              life={life}
              lifetimeSeconds = {lifetimeSeconds}  
            />
            <UserPanel 
            setStrike = {setStrike} 
            setBall = {setBall} 
            setOut = {setOut} 
            answer = {answer}
            decreaseLife = {decreaseLife} 
            addRoundHistory={addRoundHistory}
            />
            <ScoredBoard 
            _strike = {strike} 
            _ball = {ball} 
            _out = {out} 
            roundHistories={roundHistories} 
            />  
        </div>
    </div>
    
    );
}

export default PlayGround;