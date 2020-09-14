import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import "../css/HeaderComponent.scss";
import Modal from "@material-ui/core/Modal";
import AuthenticateModalComponent from "./AuthenticateModalComponent";

class HeaderComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
		};
	}

	modalClose = () => {this.setState({modalOpen:false})}

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

					<OutlinedButtonComponent
						innerHTML="Login/Signup"
						onClick={() => this.setState({ modalOpen: true })}
					/>
					<Modal
						open={this.state.modalOpen}
						onClose={this.modalClose}
					>
						<AuthenticateModalComponent/>
					</Modal>
				</div>
			</div>
		);
	}
}

export default HeaderComponent;
