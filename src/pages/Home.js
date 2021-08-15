import React from 'react'
import './Home.css'

const Home = ({history, location}) => {
    const GoGame = () => {
        window.location.replace("/Game")
    }
    console.log(history)
    return (
        <div className="Home">
            <h1>숫자 야구</h1>
            <button className="HomeButton" onClick={GoGame}>게임 시작</button>
        </div>
    )
}

export default Home