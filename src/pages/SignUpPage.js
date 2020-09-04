import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import '../css/LoginPage.css';
import InputComponent from '../components/InputComponent.js';
import ButtonComponent from '../components/ButtonComponent.js';
import axios from 'axios';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: "",
      isPasswordValid: "",
      email: "",
      password: "",
      isCPasswordValid: "",
      googleButton: true,
    };
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  validateEmail = (value) => {
    const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    let valid = re.test(value);
    this.setState({ isEmailValid: valid });
    if (valid) {
      this.setState({ email: value });
    }
  };

  validatePassword = (value) => {
    let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let valid = re.test(value);
    this.setState({ isPasswordValid: valid });
    if (valid) {
      this.setState({ password: value });
    }
  };

  validateConfirmPassword = (value) => {
    let pwd = this.state.password;
    let valid = "";
    if (value === "") valid = false;
    else valid = pwd === value;
    this.setState({ isCPasswordValid: valid });
  };

  validateSignup = () => {
    if (this.state.email !== "" && this.state.password !== "") {
      if (
        this.state.isEmailValid &&
        this.state.isPasswordValid &&
        this.state.isCPasswordValid
      ) {
        const userData = {
          email: this.state.email,
          password: this.state.password,
        };

        const { history } = this.props;
        axios
          .post("http://localhost:8000/signup", userData)
          .then((response) => {
            console.log(response.data);
            history.push("/login");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  FBLogin = (response) => {
    let login = null;
    if (response.status === "connected") {
      console.log(response);
      // this.history.push('/home');
      this.props.handleFBsignin(true);
      window.FB.api(
        "/me",
        function (response) {
          console.log(response);
        },
        { locale: "en_US", fields: "name, email" }
      );
      // console.log(window.FB.api);
      login = true;
      // this.logData(response);
      const { history } = this.props;
      history.push("/home");
    }
    // window.FB.login(this.FBLogin, {scope: 'email',return_scopes: true})
    console.log(login);
  };

  updateGoogleButton = () => {
    console.log("button update");
    this.setState({ googleButton: false });
  };

  render() {
    // console.log(window);
    if (
      this.props.location.hasOwnProperty("googleButton") &&
      this.state.googleButton
    )
      this.updateGoogleButton();
    console.log("signup render");
    if (this.props.googleSignIn === null) {
      return <h1>Loading</h1>;
    } else {
      window.gapi.load("signin2", () => {
        window.gapi.signin2.render("login-google-button");
      });
      return (
        <div className="bg-container">
          <div className="center-container">
            <div className="form-container">
              <div className="title">
                <h1>Welcome!</h1>
              </div>
              <div>
                <InputComponent
                  name="signupEmail"
                  type="email"
                  placeholder="Email Address"
                  className={
                    this.state.isEmailValid ? "valid-input" : "invalid-input"
                  }
                  onChange={(event) => this.validateEmail(event.target.value)}
                />
                <InputComponent
                  name="signupPassword"
                  type="password"
                  placeholder="Password"
                  className={
                    this.state.isPasswordValid ? "valid-input" : "invalid-input"
                  }
                  onChange={(event) =>
                    this.validatePassword(event.target.value)
                  }
                />
                <InputComponent
                  name="signupConfirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className={
                    this.state.isCPasswordValid
                      ? "valid-input"
                      : "invalid-input"
                  }
                  onChange={(event) =>
                    this.validateConfirmPassword(event.target.value)
                  }
                />
              </div>
              <ButtonComponent
                className="form-button"
                innerHTML="NEXT"
                onClick={this.validateSignup}
              />
              <ButtonComponent
                className="form-button"
                innerHTML="Connect with Facebook"
                onClick={() =>
                  window.FB.login(this.FBLogin, {
                    scope: "email",
                    return_scopes: true,
                  })
                }
              />
              <div id="login-google-button"></div>
              <Link
                to={{
                  pathname: "/login",
                  googleButton: "login",
                }}
              >
                <ButtonComponent
                  className="secondary-button"
                  innerHTML="Already have an Account?"
                />
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(SignUpPage);
