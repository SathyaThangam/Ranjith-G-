import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderComponent from "./Components/HeaderComponent";
import HomePage from "./pages/HomePage";
import ViewTicketsPage from "./pages/ViewTicketsPage";
import AuthenticateModalComponent from "./Components/AuthenticateModalComponent";
import Errorpage from "./pages/Errorpage";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./Components/ProtectedRoute";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			session: false,
		};
	}

	setSession = (value) => {
		console.log("session updated");
		this.setState({ session: value });
	};

	render() {
		return (
			<Router>
				<div className="App">
					<div className="App-content">
						<HeaderComponent handleSession={this.setSession} />
						<Switch>
							<Route
								path="/"
								exact
								render={() => (
									<HomePage handleSession={this.setSession} />
								)}
							/>
							<ProtectedRoute
								path="/viewtickets"
								exact
								component={ViewTicketsPage}
								redirect={"/login"}
							/>
							<Route
								path="/login"
								render={() => (
									<AuthenticateModalComponent handleSession={this.setSession} />
								)}
							/>
							<Route
								path="/booking/:id"
								component={BookingPage}
							/>
							<Route component={Errorpage} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
