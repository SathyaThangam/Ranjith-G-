import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import "../css/HeaderComponent.scss";
import Modal from "@material-ui/core/Modal";
import AuthenticateModalComponent from "./AuthenticateModalComponent";
import Cookie from "js-cookie";
import axios from "axios";
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
		const sessionID = Cookie.get("sessionID");
		const session = sessionID !== undefined;
		if (session !== this.state.session) this.setState({ session });
	};

	logoutHandler = () => {
		Cookie.remove("sessionID");
		axios
			.get("/logout")
			.then((response) => {
				this.checkSession();
			})
			.catch((err) => console.log(err));

		// this.setState({session:false});
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
