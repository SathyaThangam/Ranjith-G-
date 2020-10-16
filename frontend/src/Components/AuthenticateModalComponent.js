import React, { Component } from "react";
import { postRequest } from "../helpers/request-helper";
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
import { connect } from "react-redux";
import { SessionContext } from "../context/SessionContext";
import AlertComponent from "./AlertComponent";
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
			locationState: false,
		};
	}

	//Toggle between Login and Signup Component
	toggleTab = () => {
		this.setState((prev) => ({
			...resetAuthenticationState(),
			loginModal: !prev.loginModal,
		}));
	};

	//set coordinates
	setLocationState = (value) => {
		this.setState({ locationState: value });
	};

	//set and display error message
	setErrorMessage = (message) => {
		this.setState((prevState) => ({
			inputError: true,
			errorMessage: formatErrorMessage(prevState.errorMessage, message),
		}));
	};

	//set and display success message
	setSuccessMessage = (message) => {
		this.setState((prevState) => ({
			loginsuccess: true,
			successMessage: formatErrorMessage(
				prevState.successMessage,
				message
			),
		}));
	};

	//reset and clear messages
	resetMessages = () => {
		this.setState({
			inputError: false,
			errorMessage: "",
			loginsuccess: false,
			successMessage: "",
		});
	};

	//Signup
	userSignup = () => {
		const { signupEmail, signupPwd, signupCPwd } = this.state;

		this.resetMessages();

		if (
			validateEmail(signupEmail) &&
			validatePassword(signupPwd) &&
			validateConfirmPassword(signupPwd, signupCPwd) &&
			this.state.locationState
		) {
			//Data for server
			const userData = {
				email: signupEmail,
				password: signupPwd,
				location: this.props.coords,
			};

			//Connect to server
			postRequest("/user/signup", userData)
				.then((response) => {
					//get response body
					const { message } = response.data;
					if (message) {
						if (message === "success") {
							this.context.setSession(true);
							this.props.handleModalClose();
							if (this.props.location.pathname === "/login")
								this.props.history.goBack();
						} else {
							this.setState({
								signupEmail: "",
								signupPwd: "",
								signupCPwd: "",
							});
							if (message === "duplication") {
								this.setErrorMessage("Account already exists");
							} else if (message === "Invalid") {
								this.setErrorMessage("Invalid Email/Password");
							}
						}
					}
				})
				.catch((err) => console.error(err));
		}
		//Validation Error
		else {
			if (!validateEmail(signupEmail))
				this.setErrorMessage("Incorrect Email");

			if (!validatePassword(signupPwd)) {
				if (signupPwd.length < 8 || signupPwd.length > 16) {
					this.setErrorMessage(
						"Incorrect Password: Password should have 8 to 16 characters"
					);
				} else {
					this.setErrorMessage(
						"Incorrect Password: Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
					);
				}
			}

			if (!validateConfirmPassword(signupPwd, signupCPwd))
				this.setErrorMessage("Passwords Doesn't match");

			if (!this.state.locationState) {
				this.setErrorMessage("Please select your location");
			}
		}
	};

	render() {
		const ErrorAlert = (
			<AlertComponent>
				{this.state.errorMessage}
			</AlertComponent>
		);

		const SuccessAlert = (
			<AlertComponent className="success">{this.state.successMessage}</AlertComponent>
		);

		return (
			<>
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
										location={this.props.location}
										history = {this.props.history}
										handleModalClose={this.props.handleModalClose}
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
										locationState={this.state.locationState}
										setLocationState={this.setLocationState}
										setLocationErrorMessage={() =>
											this.setErrorMessage(
												"Allow location permission to access"
											)
										}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				{this.state.inputError ? ErrorAlert : ""}
				{this.state.loginsuccess ? SuccessAlert : ""}
			</>
		);
	}
}

AuthenticateModalComponent.contextType = SessionContext;
const mapStateToProps = (state) => {
	return {
		coords: state.coordsStore,
	};
};

export default connect(mapStateToProps, null)(AuthenticateModalComponent);
