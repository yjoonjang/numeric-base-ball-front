import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../pages/Home'
import Game from '../pages/Game'
import End from '../pages/End'

const App = () => {
    return (
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/Game" component={Game}/>
            <Route path="/End" component={End}/>
        </div>
    )
}


export default App
