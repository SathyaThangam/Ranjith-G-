import React from "react";
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";
class ProtectedRoute extends React.Component {


	render() {
		const sessionID = Cookie.get();
		console.log(sessionID);
		const isAuthenticated = () => {
			const sessionID = Cookie.get("sessionID");
			//TODO verify with jwt
			return sessionID !== undefined
		};
		const Component = this.props.component;
		// const isAuthenticated = true;
		if(isAuthenticated()){
			return <Component />;
		}
		else{
			return <Redirect to={{ pathname: this.props.redirect, }} />;
		}
	}
}

export default ProtectedRoute;
