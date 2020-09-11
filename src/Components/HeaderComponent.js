import React from 'react'
import { NavLink } from "react-router-dom";
import OutlinedButtonComponent from './OutlinedButtonComponent';

import "../css/HeaderComponent.scss";

export default function HeaderComponent() {
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
				<OutlinedButtonComponent innerHTML="Login/Signup" />
			</div>
		</div>
	);
}
