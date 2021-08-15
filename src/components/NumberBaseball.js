import React, { Component } from 'react'
import '../pages/Home.css'

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const num = []
for(var i = 0; i < 4; i++){
    let select = Math.floor(Math.random() * arr.length)
    num[i] = arr.splice(select, 1)[0]
    console.log(num)
}

class NumberBaseball extends Component {

    state = {
        answer: '',
        strike: 0,
        ball: 0,
        out: 0
    }

    handleChange = (e) => {
        this.setState({
            answer: e.target.value
        })
    }

    handleSubmit = (e) =>  {
        e.preventDefault()
        this.props.lifeMinus()
        this.props.handleLightOn({
            strike: this.state.strike,
            ball: this.state.ball,
            out: this.state.out
        })
        this.setState({
            answer: '',
        })
    }   
    
    Try = async () => {
        this.state.strike = 0
        this.state.ball = 0
        this.state.out = 0 
        if(num.join('') === this.state.answer){
            console.log("홈런")
        }
        for (var i = 0; i < 4; i++){
            if (num[i] == this.state.answer[i]){
                await this.setState({
                    strike: this.state.strike + 1
                })
            }
            else if (this.state.answer.includes(num[i])) {
                await this.setState({
                    ball: this.state.ball + 1
                })
            }
            else if (num[i] != this.state.answer[i] && !this.state.answer.includes(num[i])){
                await this.setState({
                    out: this.state.out + 1
                })
            }
        }
    }
    render(){
        return(
            <div>
                <form className="GameContents" onSubmit={this.handleSubmit}>
                    <input 
                        className="GameAnswer"
                        type="text"
                        maxLength="4"
                        value={this.state.answer}
                        onChange={this.handleChange}
                    />
                    <button className="GameTry" type="submit" onClick={this.Try}> 시도! </button>
                </form>
                <div>
            <div className="Out">
                <div className="OutText">O :</div>
                {this.state.out}
                <div className="OutCircle"></div>
                <div className="OutCircle"></div>
                <div className="OutCircle"></div>
                <div className="OutCircle"></div>
            </div>
            <div className="Strike">
                <div className="StrikeText">S : </div>
                {this.state.strike}
                <div className="StrikeCircle"></div>
                <div className="StrikeCircle"></div>
                <div className="StrikeCircle"></div>
                <div className="StrikeCircle"></div>
            </div>
            <div className="Ball">
                <div className="BallText">B :</div>
                {this.state.ball}
                <div className="BallCircle"></div>
                <div className="BallCircle"></div>
                <div className="BallCircle"></div>
                <div className="BallCircle"></div>
            </div> 
        </div>
            </div>
                
        ) 
    }
    
}

export default NumberBaseball