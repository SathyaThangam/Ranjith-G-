import React from 'react'
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import HomePage from "./HomePage/index";
import TicketPage from "./TicketPage/index";
function Routes() {
    return (
		<Router>
			<div className="main-content">
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/tickets" component={TicketPage} />
					<Route component={HomePage}/>
				</Switch>
			</div>
		</Router>
	);
}

export default Routes
