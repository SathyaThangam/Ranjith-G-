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
import { Provider } from "react-redux";
import store from "./redux/store";
class App extends Component {
	constructor(props) {
		super(props);

		//state to handle login session
		this.state = {
			session: false,
		};
	}

	// session Handler - passed through props to handle login session
	setSession = (value) => {
		console.log("session updated", value);
		this.setState({ session: value });
	};

	render() {
		return (
			<React.Fragment>
				<Provider store={store}>
					<Router>
						<div className="App">
							<div className="App-content">
								<HeaderComponent
									handleSession={this.setSession}
								/>
								<Switch>
									<Route
										path="/"
										exact
										component={HomePage}
									/>
									<ProtectedRoute
										path="/viewtickets"
										exact
										component={ViewTicketsPage}
										redirect={"/login"}
									/>
									<Route
										path="/login"
										render={(props) => (
											<AuthenticateModalComponent
												{...props}
											/>
										)}
									/>
									<Route
										path="/booking/:id"
										component={BookingPage}
									/>
									{/* 404 Error page Should be last route of switch */}
									<Route component={Errorpage} />
								</Switch>
							</div>
						</div>
					</Router>
				</Provider>
			</React.Fragment>
		);
	}
}



export default App;
