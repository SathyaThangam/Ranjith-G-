import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/HeaderComponent.js';
import FooterComponent from './components/FooterComponent.js';

function App() {
  return (
    <Router>
        <div className="App">
            <HeaderComponent />
            <div>
            <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/signup' component={SignUpPage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/home' component={HomePage} />
            </Switch>
            </div>
            <FooterComponent />
        </div>
    </Router>
  );
}

export default App;
