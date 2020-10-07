import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { ThemeContextProvider } from "./context/ThemeContext";

ReactDOM.render(
	<React.StrictMode>
		<ThemeContextProvider>
			<App />
		</ThemeContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

