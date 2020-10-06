import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./Routes.js";

function App() {	



	return (
		<React.Fragment>
			<Provider store={store}>
				<div className="App">
					<div className="App-content">
						<Routes />
					</div>
				</div>
			</Provider>
		</React.Fragment>
	);
}



export default App;
