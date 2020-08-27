import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginComponent.css';
import InputComponent from '../components/InputComponent.js';
import ButtonComponent from '../components/ButtonComponent.js';

class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
           isEmailValid:"",
           isPasswordValid:"",
           email:"",
           password:""
       };
    }

    validateEmail = (value) => {
        // console.log(value);
        const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        let valid = re.test(value);
        this.setState({isEmailValid:valid});
        // console.log(this.state.isEmailValid);
        let email = (valid) ? value : "" ;
        this.setState({email:email});

    }

    validatePassword = (value) => {
        let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let valid = re.test(value);
        this.setState({isPasswordValid:valid});
        let password = (valid) ? value : "" ;
        this.setState({password:password});
    }

    validateLogin = () => {
        if (this.state.email !== "" && this.state.password !== ""){
            const userData = {
                name:this.state.email,
                password:this.state.password
            }
            axios
                .post('http://localhost:8000/login',userData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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
                            <InputComponent name="loginEmail" type="email" placeholder="Email Address"
                            className={ this.state.isEmailValid ? 'valid-input' : 'invalid-input' }
                            onChange={event => this.validateEmail(event.target.value)}/>
                            <InputComponent name="loginPassword" type="password" placeholder = "Password" className={this.state.isPasswordValid ? 'valid-input' : 'invalid-input' } onChange={event => this.validatePassword(event.target.value)} />
                        </div>
                        <ButtonComponent className="form-button" innerHTML="NEXT" onClick = {this.validateLogin} />
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
