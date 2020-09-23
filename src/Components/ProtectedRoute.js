import React from "react";
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";
function ProtectedRoute(props) {

	const isAuthenticated = () => {
		const sessionID = Cookie.get("sessionID");
		return sessionID !== undefined;
	};

	const Component = props.component;

	if (isAuthenticated()) {
		return <Component {...props} />;
	} else {
		return <Redirect to={{ pathname: props.redirect }} />;
	}
}

export default ProtectedRoute;
