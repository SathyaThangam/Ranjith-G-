import React, { useEffect,useContext } from "react";
import "./App.scss";
import Routes from "./Routes";
import { withSessionContext,SessionContext } from "./context/SessionContext";
import { isAuthenticated } from "./helpers/helper";
function App() {
	const session = useContext(SessionContext);
	useEffect(() => {
		session.setValue(isAuthenticated());
		console.log(isAuthenticated());
	},[]);

	return (
		<div className="App">
			<Routes />
		</div>
	);
}

export default withSessionContext(App);
