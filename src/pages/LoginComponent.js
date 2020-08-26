import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginComponent.css';
import InputComponent from '../components/InputComponent.js';
import ButtonComponent from '../components/ButtonComponent.js';

class LoginComponent extends Component{

    validateEmail = () => {
        console.log();
    }

    render(){

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
                        <Link to='/signup'>
                            <ButtonComponent className="secondary-button" innerHTML="Need an Account?"/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}



export default LoginComponent;
