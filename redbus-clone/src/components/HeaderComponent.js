import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../scss/HeaderComponent.scss";
function HeaderComponent() {
	const [showBookingDropdown, setShowBookingDropdown] = useState(false);
	const [showLoginDropdown, setShowLoginDropdown] = useState(false);
	return (
		<div className="header-container">
			<div className="header-content">
				<div className="header-left">
					<div className="header-logo">
						<NavLink to="/" exact>
							getBus
						</NavLink>
					</div>
					<ul className="nav-container">
						<li className="nav-link">
							<NavLink
								to="/"
								exact
								activeClassName="nav-link-selected"
							>
								BUS TICKETS
							</NavLink>
						</li>
						<li className="nav-link nav-link-new">
							<NavLink
								to="/rPool"
								activeClassName="nav-link-selected"
							>
								rPool
							</NavLink>
						</li>
						<li className="nav-link">
							<NavLink
								to="/bushire"
								activeClassName="nav-link-selected"
							>
								BUS HIRE
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="header-right">
					<ul className="nav-container">
						<li className="nav-link">
							<NavLink
								to="/help"
								activeClassName="nav-link-selected"
							>
								Help
							</NavLink>
						</li>
						<li
							className="nav-content"
							onClick={() =>
								{
									setShowBookingDropdown((prev) => !prev);
									setShowLoginDropdown(false);
								}
							}
						>
							Manage Booking
							<div
								className={
									showBookingDropdown
										? "dropdown-container show"
										: "dropdown-container"
								}
							>
								<div className="top-arrow"></div>
								<div className="dropdown-content">
									<ul>
										<li className="list-header">
											Bus Tickets
										</li>
										<li>Cancel</li>
										<li>Reschedule</li>
										<li>Show My Ticket</li>
										<li>Email/SMS</li>
									</ul>
								</div>
							</div>
						</li>
						<li
							className="nav-content"
							onClick={() =>
								{
									setShowLoginDropdown((prev) => !prev);
									setShowBookingDropdown(false);
								}
							}
						>
							profile
							<div
								className={
									showLoginDropdown
										? "dropdown-container signup show"
										: "dropdown-container"
								}
							>
								<div className="top-arrow"></div>
								<div className="dropdown-content">
									<ul>
										<li>Sign In/Sign up</li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default HeaderComponent;
