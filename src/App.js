import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/HeaderComponent.js';
import LoginFooterComponent from './components/LoginFooterComponent';
import ShowDetailsPage from './pages/ShowDetailsPage';

class App extends Component {
 
  constructor(props) {
    super(props);
    this.state={
      isHomepage:false
    }
  }
  render(){
 
    return (
      <Router>
          <div className="App">
              <HeaderComponent />
              <div>
              <Switch>
                  <Route path='/' exact component={HomePage}/>
                  <Route path='/signup' component={SignUpPage}/>
                  <Route path='/login' component={LoginPage}/>
                  <Route path='/home' component={HomePage}/>
                  <Route path='/details/:id' component={ShowDetailsPage}/>
              </Switch>
              </div>
          </div>
      </Router>
    );
  }
}

export default App;
