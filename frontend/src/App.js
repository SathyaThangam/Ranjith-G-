import React, { Component } from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./Routes";
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
					<div className="App">
						<div className="App-content">
							<Routes/>
						</div>
					</div>
				</Provider>
			</React.Fragment>
		);
	}
}

export default App;
