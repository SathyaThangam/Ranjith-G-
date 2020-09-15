import React, { Component } from "react";
import ErrorIcon from "@material-ui/icons/Error";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import axios from "axios";

import InputComponent from "./InputComponent";
import OutlinedButtonComponent from "./OutlinedButtonComponent";

import "../css/AuthenticateModalComponent.scss";

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
			errorMessage: "",
			inputError: false,
			loginsuccess: false,
		};
	}

	//Toggle between Login and Signup Component
	toggleTab = () => {
		if (this.state.loginModal) {
			this.setState((prev) => ({
				loginEmail: "",
				loginPwd: "",
				loginModal: !prev.loginModal,
				inputError: false,
				errorMessage: "",
				loginsuccess: false,
				successMessage: "",
			}));
		} else {
			this.setState((prev) => ({
				signupEmail: "",
				signupPwd: "",
				signupCPwd: "",
				loginModal: !prev.loginModal,
				inputError: false,
				errorMessage: "",
				loginsuccess: false,
				successMessage: "",
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

	//Signup
	userSignup = () => {
		const { signupEmail, signupPwd, signupCPwd } = this.state;

		this.setState({
			inputError: false,
			errorMessage: "",
			loginsuccess: false,
			successMessage: "",
		});

		if (
			this.validateEmail(signupEmail) &&
			this.validatePassword(signupPwd) &&
			this.validateConfirmPassword(signupCPwd)
		) {
			//Data for server
			const userData = {
				email: signupEmail,
				password: signupPwd,
			};

			//Connect to server
			axios
				.post("/usersignup", userData)
				.then((response) => {
					//get response body
					const { message } = response.data;
					if (message !== undefined) {
						if (message === "success") {
							this.toggleTab();
						} else if (message === "duplication") {
							this.setState((prevState) => ({
								signupEmail: "",
								signupPwd: "",
								signupCPwd: "",
								inputError: true,
								errorMessage:
									prevState.errorMessage +
									"Account already exists",
							}));
						}
					}
				})
				.catch((err) => console.error(err));
		}
		//Validation Error
		else {
			if (!this.validateEmail(signupEmail))
				this.setState((prevState) => ({
					inputError: true,
					errorMessage: prevState.errorMessage + "Incorrect Email",
				}));
			if (!this.validatePassword(signupPwd))
				this.setState((prevState) => ({
					inputError: true,
					//TODO add formatErrorMessage for combining error messages
					errorMessage:
						prevState.errorMessage + " / Incorrect Password",
				}));
			if (this.validateConfirmPassword(signupCPwd))
				console.log(this.state);
			this.setState((prevState) => ({
				inputError: true,
				errorMessage:
					prevState.errorMessage + " / Passwords Doesn't match",
			}));
		}
	};

	//Login
	userLogin = () => {
		const { loginEmail, loginPwd } = this.state;

		this.setState({
			inputError: false,
			errorMessage: "",
			loginsuccess: false,
			successMessage: "",
		});

		//Validation
		if (this.validateEmail(loginEmail) && this.validatePassword(loginPwd)) {
			const userData = {
				email: loginEmail,
				password: loginPwd,
			};
			axios
				.post("/userlogin", userData)
				.then((response) => {
					const { message } = response.data;
					if (message !== undefined) {
						if (message === true) {
							//TODO add protect routes
							this.setState({
								loginEmail: "",
								loginPwd: "",
								inputError: false,
								errorMessage: "",
								successMessage: "Login Success",
								loginsuccess: true,
							});
						}
						if (message === false) {
							this.setState({
								loginEmail: "",
								loginPwd: "",
								inputError: true,
								errorMessage: "Incorrect Email/Password",
							});
						}
						if (message === "Unavailable") {
							this.toggleTab();
							this.setState({
								inputError: true,
								errorMessage: "No account available",
							});
						}
					}
				})
				.catch((err) => console.error(err));
		} else {
			if (!this.validateEmail(loginEmail))
				this.setState((prevState) => ({
					inputError: true,
					errorMessage: prevState.errorMessage + "Incorrect Email",
				}));
			if (!this.validatePassword(loginPwd))
				this.setState((prevState) => ({
					inputError: true,
					errorMessage:
						prevState.errorMessage + " / Incorrect Password",
				}));
		}
	};

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
				{/* TODO ADD FORGOT PASSWORD */}
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
				<OutlinedButtonComponent
					innerHTML="Signup for a new Journey"
					onClick={this.userSignup}
				/>
				<div className="tab-content-bottom">
					<button className="underlined-btn" onClick={this.toggleTab}>
						Know your way? Log in..
					</button>
				</div>
			</div>
		);

		const ErrorAlert = (
			<div className="alert">
				<ErrorIcon />
				{this.state.errorMessage}
			</div>
		);

		const SuccessAlert = (
			<div className="alert success">
				{/* //TODO remove icon if not needed */}
				{/* <CheckCircleIcon /> */}
				{this.state.successMessage}
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
					{this.state.inputError ? ErrorAlert : ""}
					{this.state.loginsuccess ? SuccessAlert : ""}
				</div>
			</div>
		);
	}
}

export default AuthenticateModalComponent;
