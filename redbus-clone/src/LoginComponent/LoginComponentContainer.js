import React, { useState, useEffect } from "react";
import LoginComponentMobileView from "./LoginComponentMobileView";
import LoginComponentDesktopView from "./LoginComponentDesktopView";

function LoginComponentContainer() {
	const [width, setWidth] = useState(window.innerWidth);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPwd, setLoginPwd] = useState("");

	const handleResize = () => setWidth(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return width <= 500 ? (
		<LoginComponentMobileView loginEmail={loginEmail} loginPwd={loginPwd} />
	) : (
		<span>
			<LoginComponentDesktopView
				loginEmail={loginEmail}
				loginPwd={loginPwd}
			/>
		</span>
	);
}

export default LoginComponentContainer;
