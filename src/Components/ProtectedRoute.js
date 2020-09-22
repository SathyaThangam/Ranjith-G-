import React from "react";
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";
function ProtectedRoute(props) {
	const sessionID = Cookie.get();
	console.log(sessionID);
	const isAuthenticated = () => {
		const sessionID = Cookie.get("sessionID");
		//TODO verify with jwt
		return sessionID !== undefined;
	};
	const Component = props.component;
	// const isAuthenticated = true;
	if (isAuthenticated()) {
		return <Component {...props} />;
	} else {
		return <Redirect to={{ pathname: props.redirect }} />;
	}
}

export default ProtectedRoute;
