import React,{Component} from 'react';
import '../css/LoginPageComponent.css';
import InputComponent from '../components/InputComponent.js';
import ButtonComponent from '../components/ButtonComponent.js';

class LoginPageComponent extends Component{

    validateEmail = () => {
        console.log();
    }

    render(){

        // const validateEmail = () => {
        //     console.log(this.current.value);
        // }



        return(
            <div className="bg-container">
                <div className="center-container">
                    <div className="form-container">
                      <div className="title">
                          <h1>PLEASE SIGN IN</h1>
                      </div>
                      <div>
                          <InputComponent name="loginEmail" type="email" placeholder="Email Address" />
                          <InputComponent name="loginPassword" type="password" onFocus={this.validateEmail} placeholder = "password"/>
                      </div>
                      <ButtonComponent className="form-button" innerHTML="NEXT"/>
                      <ButtonComponent className="secondary-button" innerHTML="Need an Account?"/>
                    </div>
                </div>
            </div>
        )
    }

}



export default LoginPageComponent;
