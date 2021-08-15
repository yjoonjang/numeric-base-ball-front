import React from 'react'
import Ball from '../asserts/Ball.png'
import './Home.css'

const End = (history, location) => {
   
    const reminedChance = 3
    const GoHome = () => {
        window.location.replace("/")
    }

    return(
        <div className="End">
            <h1>게임 종료</h1>
            <div className="EndMiddle">
                <img className="EndImage" src={Ball} />
                <div className="EndText">X{reminedChance}</div>
            </div>
            <button className="EndButton" onClick={GoHome}>다시 시작</button>
        </div>
    )
}

export default End