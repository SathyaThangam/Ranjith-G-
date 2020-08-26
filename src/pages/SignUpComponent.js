import React, {Component} from 'react';
import '../css/LoginPageComponent.css';
import InputComponent from '../components/InputComponent.js';
import ButtonComponent from '../components/ButtonComponent.js';

class SignUpComponent extends Component{
    render(){
        return(
            <div className="bg-container">
                <div className="center-container">
                    <div className="form-container">
                      <div className="title">
                          <h1>Welcome!</h1>
                      </div>
                      <div>
                          <InputComponent name="signupName" type="text" placeholder="Name" />
                          <InputComponent name="signupEmail" type="email" placeholder="Email Address" />
                          <InputComponent name="signupPassword" type="password" onFocus={this.validateEmail} placeholder = "password"/>
                          <InputComponent name="signupConfirmPassword" type="password" onFocus={this.validateEmail} placeholder = "Confirm password"/>
                      </div>
                      <ButtonComponent className="form-button" innerHTML="NEXT"/>
                      <ButtonComponent className="secondary-button" innerHTML="Already have an Account?"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpComponent;
