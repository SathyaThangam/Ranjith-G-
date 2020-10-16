import React, { useState, useEffect, useContext } from "react";
import { postRequest } from "../helpers/request-helper";
import {
	validateEmail,
	validatePassword,
	formatAlert,
} from "../helpers/helper";
import InputComponent from "./InputComponent";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import AlertComponent from "./AlertComponent";
import { SessionContext } from "../context/SessionContext";
function LoginComponent(props) {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPwd, setLoginPwd] = useState("");
	const [alert, setAlert] = useState(<></>);
	const session = useContext(SessionContext);
	useEffect(() => {
		return () => {
			setLoginEmail("");
			setLoginPwd("");
		};
	}, []);

	const userLogin = () => {
		//Validation
		if (validateEmail(loginEmail) && validatePassword(loginPwd)) {
			const userData = {
				email: loginEmail,
				password: loginPwd,
			};
			postRequest("/user/login", userData)
				.then((response) => {
					const { message } = response.data;
					console.log(message);
					if (message !== null && message !== undefined) {
						//TODO add disable

						if (message === true) {
							setAlert(
								<AlertComponent className="success">
									Login Success
								</AlertComponent>
							);

							session.setSession(true);
							if (
								props.location &&
								props.location.pathname === "/login"
							)
								props.history.goBack();
							else props.handleModalClose();
						}
						if (message === false) {
							console.log("object");
							setAlert((prev) =>
								formatAlert(
									prev,
									<AlertComponent>
										Incorrect Email/Password
									</AlertComponent>
								)
							);
						}
						if (message === "Unavailable") {
							setAlert((prev) =>
								formatAlert(
									prev,
									<AlertComponent>
										No account available
									</AlertComponent>
								)
							);
							
						}
						if (message === "Invalid") {
							setAlert((prev) =>
								formatAlert(
									prev,
									<AlertComponent>
										Invalid Email/Password
									</AlertComponent>
								)
							);
						}
					}
				})
				.catch((err) => console.error(err));
		} else {
			if (!validateEmail(loginEmail))
				setAlert((prev) =>
					formatAlert(
						prev,
						<AlertComponent>Incorrect Email</AlertComponent>
					)
				);
			if (!validatePassword(loginPwd))
				setAlert((prev) =>
					formatAlert(
						prev,
						<AlertComponent>Incorrect Password</AlertComponent>
					)
				);
		}
	};

	return (
		<div>
			<div className="tab-content">
				<InputComponent
					label="Email address"
					placeholder="Email-id"
					type="email"
					value={loginEmail}
					onChange={(e) => setLoginEmail(e.target.value)}
				/>
				<InputComponent
					label="Password"
					placeholder="Password"
					type="password"
					value={loginPwd}
					onChange={(e) => setLoginPwd(e.target.value)}
				/>
				<OutlinedButtonComponent
					className=" "
					innerHTML="Login to continue the Journey ▶"
					onClick={userLogin}
				/>
				{/* TODO ADD FORGOT PASSWORD */}
				<div className="tab-content-bottom">
					<button
						className="underlined-btn"
						onClick={props.toggleTab}
					>
						New Traveler? This way in..
					</button>
				</div>
			</div>
			{alert}
		</div>
	);
}

export default LoginComponent;
