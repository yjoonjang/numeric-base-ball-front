import React, { useState, useEffect } from "react";
import NumberBaseball from '../components/NumberBaseball'
import Timer from '../components/Timer'
import CircularSingle from "../components/CircularSingle";


const Game = () => {     
    const [seconds, setSeconds] = useState(59);
    const [life, setLife] = useState(100)
    const [result, setResult] = useState([])

    useEffect(() => {
        const countdown = setInterval(() => {
          if (parseInt(seconds) > 0){
            setSeconds(parseInt(seconds) - 1)
          if (parseInt(seconds) === 1){
              setSeconds(59)
              setLife(parseInt(life) - 1)
            }
          if (parseInt(life) === 0){
            window.location.replace("/End")
          }
        }
      }, 1000)
        return () => clearInterval(countdown)
      })
    

    const lifeMinus = () => {
      setLife(parseInt(life) - 1)
      setSeconds(59)
    }

    const handleLightOn = (data) => {
      setResult(result.concat(data))
    }

        return(
          <div>
              <div className="Game">
              <Timer life={life} seconds={seconds}/>
              <NumberBaseball life={life} seconds={seconds} lifeMinus={lifeMinus} handleLightOn={handleLightOn}/>
              <CircularSingle />
              {JSON.stringify(result)}
              </div>
          </div>
            
        )
}


export default Game