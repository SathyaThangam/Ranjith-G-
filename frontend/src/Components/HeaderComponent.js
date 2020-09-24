import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import "../css/HeaderComponent.scss";
import Modal from "@material-ui/core/Modal";
import AuthenticateModalComponent from "./AuthenticateModalComponent";
import Cookie from "js-cookie";
import { isAuthenticated } from "../helpers/helper";
import { postRequest } from "../helpers/request-helper";
class HeaderComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			session: false,
		};
	}

	modalClose = () => {
		this.setState({ modalOpen: false });
	};

	checkSession = () => {
		const session = isAuthenticated();
		//update only if the session state has changed
		// checking to prevent recursively calling componentDidUpdate
		if (session !== this.state.session) this.setState({ session });
	};

	logoutHandler = () => {
		const sessionID = Cookie.get("sessionID");
		postRequest("/user/logout", { sessionID })
			.then((response) => {
				Cookie.remove("sessionID");
				this.setState({ session: false });
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
					{this.state.session ? this.logOutButton : this.loginButton}
					<Modal
						open={this.state.modalOpen}
						onClose={this.modalClose}
					>
						<AuthenticateModalComponent
							handleSession={this.props.handleSession}
							handleModalClose={this.modalClose}
						/>
					</Modal>
				</div>
			</div>
		);
	}
}

export default HeaderComponent;
