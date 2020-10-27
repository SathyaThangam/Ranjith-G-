import React from "react";
import "./App.scss";
import Routes from "./Routes";
import {withDataContext} from './context/DataContext'
function App() {
	return (
		<div className="App">
			<Routes />
		</div>
	);
}

export default withDataContext(App);
