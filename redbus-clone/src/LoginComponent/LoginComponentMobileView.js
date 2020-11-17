import React from "react";
import { Link } from "react-router-dom";
import "../scss/LoginComponent.scss";
import closeIcon from "../img/close-icon.svg";
import OutlinedInputComponent from "./OutlinedInputComponent";
function LoginComponentMobileView({ loginEmail, loginPwd }) {
	return (
		<div className="login-mb-container">
			<div className="login-image">
				<img
					className="login-close-icon close-icon"
					src={closeIcon}
					alt="close"
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
				<OutlinedInputComponent
					type="email"
					placeholder="Enter your email"
					value={loginEmail}
				/>
				<OutlinedInputComponent
					type="password"
					placeholder="Enter your password"
					value={loginPwd}
				/>
				<div className="login-btn">Login/Create a new account</div>
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
