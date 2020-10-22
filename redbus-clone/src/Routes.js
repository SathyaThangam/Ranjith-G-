import React from 'react'
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./HomePage";
import TicketPage from "./TicketPage";
function Routes() {
    return (
		<Router>
			<HeaderComponent />
			<div className="main-content">
				<Switch>
					<Route to="/" exact component={HomePage} />
					<Route to="/tickets" component={TicketPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default Routes
