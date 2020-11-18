import React, { useState, useEffect } from "react";
import LoginComponentMobileView from "./LoginComponentMobileView";
import LoginComponentDesktopView from "./LoginComponentDesktopView";
import {
	validateEmail,
	validatePassword,
	validateConfirmPassword,
} from "../helpers/helper";
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

	const handleResize = () => setWidth(window.innerWidth);

	const handleInput = (event, name, validateFn, setFn) => {
		const t = event.target.value;
		setIsValidInputs((prev) => {
			return { ...prev, [name]: validateFn(t) };
		});
		setFn(t);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
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
		/>
	);
}

export default LoginComponentContainer;
