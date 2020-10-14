import React, { Component } from "react";
import ErrorPage from "./Errorpage";
class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		//  log the error to an error reporting service
	}

	render() {
		if (this.state.hasError) {
			return <ErrorPage message="Network Error" />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
