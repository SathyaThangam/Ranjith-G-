import React, { Component } from "react";
import InputComponent from "./InputComponent";

import "../css/AuthenticateModalComponent.scss";
import OutlinedButtonComponent from "./OutlinedButtonComponent";

class AuthenticateModalComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginModal: true,
			loginEmail: "",
			loginPwd: "",
			signupEmail: "",
			signupPwd: "",
			signupCPwd: "",
		};
	}

	toggleTab = () => {

        console.log(this.state);
		if (this.state.loginModal) {
			this.setState((prev) => ({
				loginEmail: "",
				loginPwd: "",
				signupEmail: "",
				signupPwd: "",
				signupCPwd: "",
				loginModal: !prev.loginModal,
			}));
		} else {
			this.setState((prev) => ({
				signupEmail: "",
				signupPwd: "",
				signupCPwd: "",
				loginModal: !prev.loginModal,
			}));
		}
	};

	//validation
	validateEmail = (value) => {
		const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
		return re.test(value);
	};

	validatePassword = (value) => {
		let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
		return re.test(value);
	};

	validateConfirmPassword = (value) => {
		let pwd = this.state.signupPwd;
		let valid = "";
		if (value === "") valid = false;
		else valid = pwd === value;

		return valid;
	};

	//Login
	userLogin = () => {
		const { loginEmail, loginPwd } = this.state;
		if (this.validateEmail(loginEmail) && this.validatePassword(loginPwd)) {
			console.log("login success");
		}
    };
    
    //Signup 
    userSignup = () => {
        const {signupEmail,signupPwd,signupCPwd} = this.state;
        if (this.validateEmail(signupEmail) && this.validatePassword(signupPwd) && this.validateConfirmPassword(signupCPwd)) {
			console.log("signup success");
		}
    }

	render() {
		const LoginComponent = (
			<div className="tab-content">
				<InputComponent
					placeholder="Email-id"
					type="email"
					value={this.state.loginEmail}
					onChange={(event) =>
						this.setState({ loginEmail: event.target.value })
					}
				/>
				<InputComponent
					placeholder="Password"
					type="password"
					value={this.state.loginPwd}
					onChange={(event) =>
						this.setState({ loginPwd: event.target.value })
					}
				/>
				<OutlinedButtonComponent
					innerHTML="Login to continue the Journey"
					onClick={this.userLogin}
				/>
				<div className="tab-content-bottom">
					<button className="underlined-btn" onClick={this.toggleTab}>
						New Traveler? This way in..
					</button>
				</div>
			</div>
		);

		const SignupComponent = (
			<div className="tab-content">
				<InputComponent
					placeholder="Email-id"
					type="email"
					value={this.state.signupEmail}
					onChange={(event) =>
						this.setState({ signupEmail: event.target.value })
					}
				/>
				<InputComponent
					placeholder="Password"
					type="password"
					value={this.state.signupPwd}
					onChange={(event) =>
						this.setState({ signupPwd: event.target.value })
					}
				/>
				<InputComponent
					placeholder="Confirm Password"
					type="password"
					value={this.state.signupCPwd}
					onChange={(event) =>
						this.setState({ signupCPwd: event.target.value })
					}
				/>
				<OutlinedButtonComponent innerHTML="Signup for a new Journey" onClick={this.userSignup} />
				<div className="tab-content-bottom">
					<button className="underlined-btn" onClick={this.toggleTab}>
						Know your way? Log in..
					</button>
				</div>
			</div>
		);
		return (
			<div className="modal-container">
				<div className="modal-content">
					<div className="tab-title-container">
						<div className="tab-title">
							<button
								className={
									this.state.loginModal ? "active" : ""
								}
								onClick={this.toggleTab}
							>
								Login
							</button>
						</div>
						<div className="tab-title">
							<button
								className={
									this.state.loginModal ? "" : "active"
								}
								onClick={this.toggleTab}
							>
								Signup
							</button>
						</div>
					</div>
					<div className="tab-container">
						{this.state.loginModal
							? LoginComponent
							: SignupComponent}
					</div>
				</div>
			</div>
		);
	}
}

export default AuthenticateModalComponent;
