import React from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/helper";
import { withRouter } from "react-router";
function ProtectedRoute(props) {
	const Component = props.component;

	if (isAuthenticated()) {
		console.log(props);
		return <Component {...props} />;
	} else {
		return <Redirect to={{ pathname: props.redirect }} />;
	}
}

export default withRouter(ProtectedRoute);
