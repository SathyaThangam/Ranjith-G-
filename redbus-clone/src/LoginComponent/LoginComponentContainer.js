import React, { useState, useEffect,useContext } from "react";
import LoginComponentMobileView from "./LoginComponentMobileView";
import LoginComponentDesktopView from "./LoginComponentDesktopView";
import {
	validateEmail,
	validatePassword,
	validateConfirmPassword,
} from "../helpers/helper";
import { postRequest } from "../helpers/request-helper";
import {SessionContext} from '../context/SessionContext'
function LoginComponentContainer({ setShow }) {
	const [width, setWidth] = useState(window.innerWidth);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPwd, setLoginPwd] = useState("");
	const [loginCPwd, setLoginCPwd] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [isValidInputs, setIsValidInputs] = useState({
		email: true,
		pwd: true,
		cpwd: true,
	});
	const [alert, setAlert] = useState({});
	const session = useContext(SessionContext);

	const handleResize = () => setWidth(window.innerWidth);

	const handleInput = (event, name, validateFn, setFn) => {
		const t = event.target.value;
		setIsValidInputs((prev) => {
			return { ...prev, [name]: validateFn(t) };
		});
		setFn(t);
	};

	const handleAction = () => {
		const userData = { email: loginEmail, password: loginPwd };
		const isAllValid = () =>
			isValidInputs["email"] &&
			isValidInputs["pwd"] &&
			isValidInputs["cpwd"]; //value => value === true
		if (isAllValid) {
			if (isSignUp) {
				postRequest("/user/signup", userData)
					.then((response) => {
						const { message } = response.data;
						if (message) {
							if (message === "success") {
								setShow(false);
								setAlert({
									class: "success",
									message: "Account created",
								});
								session.setValue(true);
							} else {
								if (message === "duplication") {
									setAlert({
										class: "",
										message: "Account already exists",
									});
								} else if (message === "Invalid") {
									setAlert({
										class: "",
										message: "Invalid Email/Password",
									});
								}
							}
						}
					})
					.catch((err) => console.log(err));
			} else {
				postRequest("/user/login", userData)
					.then((response) => {
						const { message } = response.data;
						if (message) {
							if (message === true) {
								setAlert({
									class: "success",
									message: "Login Success",
								});
								session.setValue(true);
								setShow(false);
							} else if (message === false) {
								setAlert({
									class: "",
									message: "Incorrect email/password",
								});
							} else if (message === "Unavailable") {
								setAlert({
									class: "",
									message: "No account available",
								});
							} else if (message === "Invalid") {
								setAlert({
									class: "",
									message: "Invalid email/password",
								});
							}
						}
					})
					.catch((err) => console.log(err));
			}
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (isSignUp)
			setAlert({
				class: "message",
				message:
					"Password should be 8-16 characters long \n Should contain atleast one capital letter,one small letter, one number and one special character",
			});
		else {
			setAlert({});
		}
	}, [isSignUp]);
	return width <= 500 ? (
		<LoginComponentMobileView
			loginEmail={loginEmail}
			handleLoginEmail={(e) =>
				handleInput(e, "email", validateEmail, setLoginEmail)
			}
			loginPwd={loginPwd}
			handleLoginPwd={(e) =>
				handleInput(e, "pwd", validatePassword, setLoginPwd)
			}
			loginCPwd={loginCPwd}
			handleLoginCPwd={(e) => {
				const t = e.target.value;
				setIsValidInputs((prev) => {
					return {
						...prev,
						cpwd: validateConfirmPassword(loginPwd, t),
					};
				});
				setLoginCPwd(t);
			}}
			isSignUp={isSignUp}
			isValidInputs={isValidInputs}
			setIsSignUp={setIsSignUp}
			setShow={setShow}
			alert={alert}
			handleAction={handleAction}
		/>
	) : (
		<LoginComponentDesktopView
			loginEmail={loginEmail}
			handleLoginEmail={(e) =>
				handleInput(e, "email", validateEmail, setLoginEmail)
			}
			loginPwd={loginPwd}
			handleLoginPwd={(e) =>
				handleInput(e, "pwd", validatePassword, setLoginPwd)
			}
			loginCPwd={loginCPwd}
			handleLoginCPwd={(e) => {
				const t = e.target.value;
				setIsValidInputs((prev) => {
					return {
						...prev,
						cpwd: validateConfirmPassword(loginPwd, t),
					};
				});
				setLoginCPwd(t);
			}}
			isSignUp={isSignUp}
			isValidInputs={isValidInputs}
			setIsSignUp={setIsSignUp}
			setShow={setShow}
			alert={alert}
			handleAction={handleAction}
		/>
	);
}

export default LoginComponentContainer;
