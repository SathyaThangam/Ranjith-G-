import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage";
import HeaderComponent from "./components/HeaderComponent.js";
import ShowDetailsPage from "./pages/ShowDetailsPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomepage: false,
      isGoogleSignIn: null,
      isFBSignin: null,
      isLocalsignin:null
    };
  }

  //initialize google client
  initializeGoogleSignIn() {
    //load google client
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "764228280665-qpda92hjhaicrm1loa05c7ccc1mj306g.apps.googleusercontent.com",
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          //set whether user is signed in
          this.setState({ isGoogleSignIn: isSignedIn });

          // listen to login status
          authInstance.isSignedIn.listen((isSignedIn) => {
            this.setState({ isGoogleSignIn: isSignedIn });
          });
        });
    });
  }

  //loading fb sdk
  loadFbLoginApi() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 747573475813380,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v8.0", // use version 2.1
      });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  //handler for fb signin status
  handleFBsignin = (status) => {
    this.setState({ isFBSignin: status });
  };

  handleLocalsignin = (status) =>{
    this.setState({isLocalsignin:status});
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
    //loading FB Api
    this.loadFbLoginApi();
  }

  //Protecting routes
  ifSignedIn(Component) {
    // var signedIn = true;
    return this.state.isGoogleSignIn || this.state.isFBSignin || this.state.isLocalsignin ? (
      <HomePage
        googleSignIn = {this.state.isGoogleSignIn}
        fbSignin = {this.state.isFBSignin}
        handleFBsignin = {this.handleFBsignin}
        handleLocalsignin = {this.handleLocalsignin}
      />
    ) : (
      <Component
        googleSignIn = {this.state.isGoogleSignIn}
        fbSignin = {this.state.isFBSignin}
        localSignin = {this.state.isLocalsignin}
        handleFBsignin = {this.handleFBsignin}
        handleLocalsignin = {this.handleLocalsignin}
      />
    );
  }

  render() {
    console.log("App render");
    return (
      <Router>
        <div className="App">
          <HeaderComponent />
          <div>
            <Switch>
              <Route path="/" exact render={() => this.ifSignedIn(LoginPage)} />
              <Route
                path="/signup"
                render={() => this.ifSignedIn(SignUpPage)}
              />
              <Route
                path={["/login", "/home"]}
                render={() => this.ifSignedIn(LoginPage)}
              />
              <Route path="/details/:id" component={ShowDetailsPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
