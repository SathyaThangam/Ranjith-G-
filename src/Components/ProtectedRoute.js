import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookie from 'js-cookie';
class ProtectedRoute extends React.Component {

	render() {
        const sessionID = Cookie.get();
		console.log(sessionID);
        const isAuthenticated = () => {
			const sessionID = Cookie.get("sessionID");
			console.log(sessionID);
			//TODO verify with jwt
			// return sessionID !== undefined
			return false;
		};
		const Component = this.props.component;
		// const isAuthenticated = true;
		console.log("Protected Route");
		return isAuthenticated ? (
			<Component />
		) : (
			<Redirect to={{ pathname: "/login" }} />
		);
	}
}

export default ProtectedRoute;