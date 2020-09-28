import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticateModalComponent from './Components/AuthenticateModalComponent';
import HeaderComponent from './Components/HeaderComponent';
import ProtectedRoute from './Components/ProtectedRoute';
import BookingPage from "./pages/BookingPage";
import Errorpage from './pages/Errorpage';
import HomePage from './pages/HomePage';
import ViewTicketsPage from './pages/ViewTicketsPage';


export default function Routes() {
    return (
		<Router>
			<HeaderComponent />
			<Switch>
				<Route path="/" exact component={HomePage} />
				<ProtectedRoute
					path="/viewtickets"
					exact
					component={ViewTicketsPage}
					redirect={"/login"}
				/>
				<Route
					path="/login"
					render={(props) => (
						<AuthenticateModalComponent {...props} />
					)}
				/>
				<Route path="/booking/:id" component={BookingPage} />
				{/* 404 Error page Should be last route of switch */}
				<Route component={Errorpage} />
			</Switch>
		</Router>
	);
}
