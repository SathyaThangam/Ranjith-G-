import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import axios from 'axios';
import '../css/LoginPage.css';
import InputComponent from '../components/InputComponent.js';
import ButtonComponent from '../components/ButtonComponent.js';


class LoginPage extends Component{



    constructor(props){
        super(props);
        this.state = {
           isEmailValid:"",
           isPasswordValid:"",
           email:"",
           password:""
       };
    }

    static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
    };
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
            if(this.state.isEmailValid && this.state.isPasswordValid){

                const userData = {
                    name:this.state.email,
                    password:this.state.password
                }
                const { match, location, history } = this.props;
                axios
                    .post('http://localhost:8000/login',userData)
                    .then((response) => {
                        console.log(response.data);
                        history.push('/home');
                    })
                    .catch(function (error) {
                    console.log(error);
                });
            }
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



export default withRouter(LoginPage);
