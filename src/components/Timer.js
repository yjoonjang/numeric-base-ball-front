import React, { useState, useEffect } from "react";
import '../pages/Home.css'
import TimerImage from '../asserts/Timer.png'
import HeartImage from '../asserts/Heart.jpg'


const TimerHeart = (props) => {

  return (
    <div className="GameHeader">
      <img className="TimerImage" src={TimerImage}/>
      <div className="TimerNum">00:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}</div>
      <img className="HeartImage" src={HeartImage}/>
      <div className="HeartText">X{props.life}</div>
  </div>
      
  );
}

export default TimerHeart