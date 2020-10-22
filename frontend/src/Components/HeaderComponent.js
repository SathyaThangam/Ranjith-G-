import React, { Component,Suspense,lazy } from "react";
import { NavLink } from "react-router-dom";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import "../css/HeaderComponent.scss";
import Modal from "@material-ui/core/Modal";
import CircularLoaderComponent from "./CircularLoaderComponent";
import Cookie from "js-cookie";
import { isAuthenticated } from "../helpers/helper";
import { postRequest } from "../helpers/request-helper";
import { SessionContext } from "../context/SessionContext";
import { ThemeContext } from "../context/ThemeContext";
const AuthenticateModalComponent = lazy(() =>
	import("./AuthenticateModalComponent")
);
class HeaderComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			themePickerVisibilty: false,
		};
	}

	modalClose = () => {
		this.setState({ modalOpen: false });
	};

	checkSession = () => {
		const session = isAuthenticated();
		//update only if the session state has changed
		// checking to prevent recursively calling componentDidUpdate
		if (session !== this.context.session) this.context.setSession(session);
	};

	logoutHandler = () => {
		const sessionID = Cookie.get("sessionID");
		postRequest("/user/logout", { sessionID })
			.then((response) => {
				Cookie.remove("sessionID");
				this.context.setSession(false);
			})
			.catch((err) => console.log(err));
	};

	loginButton = (
		<OutlinedButtonComponent
			innerHTML="Login/Signup"
			onClick={() => this.setState({ modalOpen: true })}
		/>
	);

	logOutButton = (
		<OutlinedButtonComponent
			innerHTML="Logout"
			onClick={this.logoutHandler}
		/>
	);

	componentDidMount() {
		this.checkSession();
	}

	componentDidUpdate() {
		this.checkSession();
	}

	render() {
		return (
			<ThemeContext.Consumer>
				{({ theme, setTheme }) => (
					<div className="header">
						<div className="header-logo">
							<NavLink to="/" className="header-logo">
								<h1>getBus</h1>
							</NavLink>
						</div>

						<div className="header-nav">
							<NavLink
								to="/viewtickets"
								className="nav-link"
								activeClassName="selected"
							>
								View Tickets
							</NavLink>
							<div>
								<span
									className="toggle-btn"
									onClick={() => {
										this.setState((prevState) => ({
											themePickerVisibilty: !prevState.themePickerVisibilty,
										}));
									}}
								>
									Change theme
								</span>

								<div
									className={
										this.state.themePickerVisibilty
											? "dropdown-color-content visible"
											: "dropdown-color-content"
									}
								>
									<span className="close-container">
										<button
											className="close"
											onClick={() =>
												this.setState({
													themePickerVisibilty: false,
												})
											}
										>
											close
										</button>
									</span>
									<p>
										Primary color{" "}
										<input
											type="color"
											className=""
											value={theme["primary-color"]}
											placeholder="Change color"
											onChange={(e) => {
												setTheme({
													...theme,
													"primary-color":
														e.target.value,
												});
											}}
										></input>
									</p>
									<p>
										Secondary color{" "}
										<input
											type="color"
											className=""
											value={theme["secondary-color"]}
											placeholder="Change color"
											onChange={(e) => {
												setTheme({
													...theme,
													"secondary-color":
														e.target.value,
												});
											}}
										></input>
									</p>
									<p>
										Accent color{" "}
										<input
											type="color"
											className=""
											value={theme["accent-color"]}
											placeholder="Change color"
											onChange={(e) => {
												setTheme({
													...theme,
													"accent-color":
														e.target.value,
												});
											}}
										></input>
									</p>
									<p>
										fallback color{" "}
										<input
											type="color"
											value={theme["color"]}
											placeholder="Change color"
											onChange={(e) => {
												setTheme({
													...theme,
													color: e.target.value,
												});
											}}
										></input>
									</p>
									<p>
										background color{" "}
										<input
											type="color"
											value={theme["background-color"]}
											placeholder="Change color"
											onChange={(e) => {
												setTheme({
													...theme,
													"background-color":
														e.target.value,
												});
											}}
										></input>
									</p>
								</div>
							</div>
							{this.context.session
								? this.logOutButton
								: this.loginButton}
							<Modal
								open={this.state.modalOpen}
								onClose={this.modalClose}
							>
								<Suspense fallback={<CircularLoaderComponent/>}>
									<AuthenticateModalComponent
										handleModalClose={this.modalClose}
									/>
								</Suspense>
							</Modal>
						</div>
					</div>
				)}
			</ThemeContext.Consumer>
		);
	}
}

HeaderComponent.contextType = SessionContext;

export default HeaderComponent;
