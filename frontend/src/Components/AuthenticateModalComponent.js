import React, { Component } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import axios from "axios";

import {
	validateEmail,
	validatePassword,
	validateConfirmPassword,
	formatErrorMessage,
	resetAuthenticationState,
} from "../helpers/helper";
import "../css/AuthenticateModalComponent.scss";
import "./loginscene.svg";
import SignupComponent from "./SignupComponent";
import LoginComponent from "./LoginComponent";
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
		this.setState((prev) => ({
			...resetAuthenticationState(),
			loginModal: !prev.loginModal,
		}));
	};

	//Signup
	userSignup = async () => {
		const { signupEmail, signupPwd, signupCPwd } = this.state;

		this.setState({
			inputError: false,
			errorMessage: "",
			loginsuccess: false,
			successMessage: "",
		});

		if (
			validateEmail(signupEmail) &&
			validatePassword(signupPwd) &&
			validateConfirmPassword(signupCPwd)
		) {
			//Data for server
			const userData = {
				email: signupEmail,
				password: signupPwd,
			};

			//Connect to server
			try {
				await axios
					.post("/user/signup", userData)
					.then((response) => {
						//get response body
						const { message } = response.data;
						if (message !== undefined) {
							if (message === "success") {
								//TODO go to booking page
								this.props.handleSession(true);
								this.props.handleModalClose();
								if (this.props.location.pathname === "/login")
									this.props.history.goBack();
							} else if (message === "duplication") {
								this.setState({
									signupEmail: "",
									signupPwd: "",
									signupCPwd: "",
									inputError: true,
									errorMessage: "Account already exists",
								});
							} else if (message === "Invalid") {
								this.setState({
									signupEmail: "",
									signupPwd: "",
									signupCPwd: "",
									inputError: true,
									errorMessage: "Invalid Email/Password",
								});
							}
						}
					})
					.catch((err) => console.error(err));
			} catch (error) {
				console.log(error);
			}
		}
		//Validation Error
		else {
			if (!validateEmail(signupEmail))
				this.setState((prevState) => ({
					inputError: true,
					errorMessage: formatErrorMessage(
						prevState.errorMessage,
						"Incorrect Email"
					),
				}));
			if (!validatePassword(signupPwd))
				this.setState((prevState) => ({
					inputError: true,
					errorMessage: formatErrorMessage(
						prevState.errorMessage,
						"Incorrect Password"
					),
				}));
			if (!validateConfirmPassword(signupPwd,signupCPwd)) console.log(this.state);
			this.setState((prevState) => ({
				inputError: true,
				errorMessage: formatErrorMessage(
					prevState.errorMessage,
					"Passwords Doesn't match"
				),
			}));
		}
	};

	//Login
	userLogin = async () => {
		const { loginEmail, loginPwd } = this.state;

		this.setState({
			inputError: false,
			errorMessage: "",
			loginsuccess: false,
			successMessage: "",
		});

		//Validation
		if (validateEmail(loginEmail) && validatePassword(loginPwd)) {
			const userData = {
				email: loginEmail,
				password: loginPwd,
			};
			try {
				await axios
					.post("/user/login", userData)
					.then((response) => {
						const { message } = response.data;
						if (message !== undefined) {
							if (message === true) {
								this.setState({
									loginEmail: "",
									loginPwd: "",
									inputError: false,
									errorMessage: "",
									successMessage: "Login Success",
									loginsuccess: true,
								});

								this.props.handleSession(true);

								if (this.props.location !== undefined) {
									if (
										this.props.location.pathname ===
										"/login"
									)
										this.props.history.goBack();
								} else this.props.handleModalClose();
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
							if (message === "Invalid") {
								this.setState({
									loginEmail: "",
									loginPwd: "",
									inputError: true,
									errorMessage: "Invalid Email/Password",
								});
							}
						}
					})
					.catch((err) => console.error(err));
			} catch (error) {
				console.log(error);
			}
		} else {
			if (!validateEmail(loginEmail))
				this.setState((prevState) => ({
					inputError: true,
					errorMessage: formatErrorMessage(
						prevState.errorMessage,
						"Incorrect Email"
					),
				}));
			if (!validatePassword(loginPwd))
				this.setState((prevState) => ({
					inputError: true,
					errorMessage: formatErrorMessage(
						prevState.errorMessage,
						"Incorrect Password"
					),
				}));
		}
	};

	render() {

		const ErrorAlert = (
			<div className="alert">
				<ErrorIcon />
				{this.state.errorMessage}
			</div>
		);

		const SuccessAlert = (
			<div className="alert success">{this.state.successMessage}</div>
		);

		return (
			<div className="modal-container">
				<div className="modal-content">
					<div className="modal-content-left">
						<img src="loginscene.svg" alt="login scene" />
					</div>
					<div className="modal-content-right">
						<div className="tab-title-container">
							<div className="tab-title">
								<button onClick={this.toggleTab}>
									Login/Signup
								</button>
							</div>
						</div>
						<div className="tab-container">
							{this.state.loginModal ? (
								<LoginComponent
									loginEmail={this.state.loginEmail}
									onLoginEmailChange={(event) =>
										this.setState({
											loginEmail: event.target.value,
										})
									}
									loginPwd={this.state.loginPwd}
									onLoginPwdChange={(event) =>
										this.setState({
											loginPwd: event.target.value,
										})
									}
									userLogin={this.userLogin}
									toggleTab={this.toggleTab}
								/>
							) : (
								<SignupComponent
									signupEmail={this.state.signupEmail}
									onSignupEmailChange={(event) =>
										this.setState({
											signupEmail: event.target.value,
										})
									}
									signupPwd={this.state.signupPwd}
									onSignupPwdChange={(event) =>
										this.setState({
											signupPwd: event.target.value,
										})
									}
									signupCPwd={this.state.signupCPwd}
									onSignupCPwdChange={(event) =>
										this.setState({
											signupCPwd: event.target.value,
										})
									}
									userSignup={this.userSignup}
									toggleTab={this.toggleTab}
								/>
							)}
						</div>
						{this.state.inputError ? ErrorAlert : ""}
						{this.state.loginsuccess ? SuccessAlert : ""}
					</div>
				</div>
			</div>
		);
	}
}

export default AuthenticateModalComponent;
