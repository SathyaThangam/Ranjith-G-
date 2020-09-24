import React from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/helper";
function ProtectedRoute(props) {

	const Component = props.component;

	if (isAuthenticated()) {
		return <Component {...props} />;
	} else {
		return <Redirect to={{ pathname: props.redirect }} />;
	}
}

export default ProtectedRoute;
