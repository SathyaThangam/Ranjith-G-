import React, { Component } from 'react'
import '../css/NavBarComponent.css';

class NavBarComponent extends Component {
  signoutHandler = () => {
    console.log(this);
    if (this.props.googleSignIn === true) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      authInstance.signOut();
      console.log("if navbar");
    } 
    else if(this.props.fbSignin === true) {
      console.log("else ");
      window.FB.logout(function (response) {
        console.log("logged out");
        console.log(response);
      });
      this.props.handleFBsignin(false);
    }
    // console.log(this.props.history);
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <a href="/home">Movies</a>
            <a href="/home">Events</a>
            <a href="/home">Plays</a>
            <a href="/home">Sports</a>
            <a href="/home">Activities</a>
            <a href="/home">Monuments</a>
            <a href="/home">Fanhood</a>
            <a href="/home">Buzz</a>
          </div>
          <div className="navbar-right">
            <a href="/home">
              ListYourShow
              <span className="new-nav-item">NEW</span>
            </a>
            <a href="/home">Corporates</a>
            <a href="/home">Offers</a>
            <a href="/home">Gift Cards</a>
            <button className="signout-btn" onClick={this.signoutHandler}>
              SIGN OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBarComponent
