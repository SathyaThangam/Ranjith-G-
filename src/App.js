import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderComponent from "./Components/HeaderComponent";
import HomePage from "./pages/HomePage";
import ViewTicketsPage from "./pages/ViewTicketsPage";
import AuthenticateModalComponent from "./Components/AuthenticateModalComponent";
import Errorpage from "./pages/Errorpage";

function App() {
	return (
		<Router>
			<div className="App">
				<div className="App-content">
					<HeaderComponent />
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route
							path="/viewtickets"
							exact
							component={ViewTicketsPage}
						/>
						<Route
							path="/login"
							component={AuthenticateModalComponent}
						/>
						<Route
							component={Errorpage}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
