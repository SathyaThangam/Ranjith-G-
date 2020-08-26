import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import LoginComponent from './pages/LoginComponent.js';
import SignUpComponent from './pages/SignUpComponent.js';
import HomeComponent from './components/HomeComponent.js';
import HeaderComponent from './components/HeaderComponent.js';
import FooterComponent from './components/FooterComponent.js';

function App() {
  return (
    <Router>
        <div className="App">
            <HeaderComponent />
            <div>
            <Switch>
                <Route path='/' exact component={HomeComponent}/>
                <Route path='/signup' component={SignUpComponent}/>
                <Route path='/login' component={LoginComponent}/>
            </Switch>
            </div>
            <FooterComponent />
        </div>
    </Router>
  );
}

export default App;
