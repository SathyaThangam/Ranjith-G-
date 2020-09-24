import React, { Component } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import axios from "axios";
import InputComponent from "./InputComponent";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import {
	validateEmail,
	validatePassword,
	validateConfirmPassword,
	formatErrorMessage,
} from "../helpers/helper";
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
		console.log(props);
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
			axios
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
			if (!validateConfirmPassword(signupCPwd)) console.log(this.state);
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
	userLogin = () => {
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
			axios
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
								if (this.props.location.pathname === "/login")
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
		const LoginComponent = (
			<div className="tab-content">
				<InputComponent
					label="Email address"
					placeholder="Email-id"
					type="email"
					value={this.state.loginEmail}
					onChange={(event) =>
						this.setState({ loginEmail: event.target.value })
					}
				/>
				<InputComponent
					label="Password"
					placeholder="Password"
					type="password"
					value={this.state.loginPwd}
					onChange={(event) =>
						this.setState({ loginPwd: event.target.value })
					}
				/>
				<OutlinedButtonComponent
					className=" "
					innerHTML="Login to continue the Journey ▶"
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
					label="Email address"
					placeholder="Email-id"
					type="email"
					value={this.state.signupEmail}
					onChange={(event) =>
						this.setState({ signupEmail: event.target.value })
					}
				/>
				<InputComponent
					label="Password"
					placeholder="Password"
					type="password"
					value={this.state.signupPwd}
					onChange={(event) =>
						this.setState({ signupPwd: event.target.value })
					}
				/>
				<InputComponent
					label="Confirm Password"
					placeholder="Confirm Password"
					type="password"
					value={this.state.signupCPwd}
					onChange={(event) =>
						this.setState({ signupCPwd: event.target.value })
					}
				/>
				<OutlinedButtonComponent
					className=" "
					innerHTML="Signup for a new Journey ▶"
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
							{this.state.loginModal
								? LoginComponent
								: SignupComponent}
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
