import React from "react";
import { Link } from "react-router-dom";
import "../scss/LoginComponent.scss";
import closeIcon from "../img/close-icon.svg";
import OutlinedInputComponent from "./OutlinedInputComponent";
function LoginComponentMobileView({
	loginEmail,
	handleLoginEmail,
	loginPwd,
	handleLoginPwd,
	loginCPwd,
	handleLoginCPwd,
	isSignUp,
	isValidInputs,
	setIsSignUp,
	setShow
}) {
	const styleCondition = (value) =>
		isValidInputs[value]
			? { border: "1px solid black" }
			: { border: "1px solid red" };

	return (
		<div className="login-mb-container">
			<div className="login-image">
				<img
					className="login-close-icon close-icon"
					src={closeIcon}
					alt="close"
					onClick={() => setShow(false)}
				/>
				<div className="img-text">
					<div>Unlock the</div>
					<div>Smarter Way to Travel</div>
				</div>
			</div>
			<div
				style={{
					padding: "10px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h2>Sign in to avail exciting discounts and cashbacks!!!</h2>
				<label className="login-new-account">
					<input
						type="checkbox"
						value={isSignUp}
						onChange={(e) => setIsSignUp(e.target.checked)}
					/>{" "}
					New Account?
				</label>
				<OutlinedInputComponent
					type="email"
					placeholder="Enter your email"
					value={loginEmail}
					onChange={handleLoginEmail}
					style={styleCondition("email")}
				/>
				<OutlinedInputComponent
					type="password"
					placeholder="Enter your password"
					value={loginPwd}
					onChange={handleLoginPwd}
					style={styleCondition("pwd")}
				/>
				{isSignUp ? (
					<OutlinedInputComponent
						type="password"
						placeholder="Confirm your password"
						value={loginCPwd}
						onChange={handleLoginCPwd}
						style={styleCondition("cpwd")}
					/>
				) : (
					""
				)}
				<div className="login-btn">
					{isSignUp ? "Create a New Account" : "Login"}
				</div>
				<span className="info">
					By signing up, you agree to our{" "}
					<Link className="info-link" to="/terms">
						Terms and Conditions
					</Link>{" "}
					and{" "}
					<Link className="info-link" to="/privacypolicy">
						Privacy Policy
					</Link>
				</span>
			</div>
		</div>
	);
}

export default LoginComponentMobileView;
