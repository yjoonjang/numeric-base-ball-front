import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home/index';
import CreateAccount from './CreateAccount/index';
import Login from './Login';
import PlayGround from './PlayGround/index';
import End from './End/index';

const App = () => {
    return (
        <div className="fill-height">
            <Route exact path="/" component={Home} />
            <Route path="/Create-Account" component={CreateAccount} />
            <Route path="/Login" component={Login} />
            <Route path="/Play-ground" component={PlayGround} />
            <Route path="/End" component={End} />
        </div>
    );
};

export default App;
