import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../scss/HeaderComponent.scss";
import burgerIcon from "../img/burger.svg";
import LoginComponent from "../LoginComponent";
import { SessionContext } from "../context/SessionContext";
import { postRequest } from "../helpers/request-helper";
import Cookie from "js-cookie";
function HeaderComponent() {
	const [showBookingDropdown, setShowBookingDropdown] = useState(false);
	const [showLoginDropdown, setShowLoginDropdown] = useState(false);
	const [showSideBar, setShowSideBar] = useState(false);
	const [showLoginComponent, setShowLoginComponent] = useState(false);
	const bookingRef = useRef(null);
	const loginRef = useRef(null);
	const session = useContext(SessionContext);
	useEffect(() => {
		const clickOutside = (event) => {
			if (
				showLoginDropdown &&
				loginRef.current &&
				!loginRef.current.contains(event.target)
			) {
				setShowLoginDropdown(false);
			}
		};

		window.addEventListener("mousedown", clickOutside);
		return () => {
			window.removeEventListener("mousedown", clickOutside);
		};
	}, [showLoginDropdown, loginRef]);
	useEffect(() => {
		const clickOutside = (event) => {
			if (
				showBookingDropdown &&
				bookingRef.current &&
				!bookingRef.current.contains(event.target)
			) {
				setShowBookingDropdown(false);
			}
		};

		window.addEventListener("mousedown", clickOutside);
		return () => {
			window.removeEventListener("mousedown", clickOutside);
		};
	}, [showBookingDropdown, bookingRef]);

	const handleLogout = () => {
		const sessionID = Cookie.get("sessionID");
		postRequest("/user/logout", { sessionID })
			.then((response) => {
				Cookie.remove("sessionID");
				session.setValue(false);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{showLoginComponent ? (
				<LoginComponent setShow={setShowLoginComponent} />
			) : (
				""
			)}
			<div className="header-container">
				<div className="header-content">
					<div className="header-left">
						<div className="sidebar-btn">
							<img
								src={burgerIcon}
								alt="sidebar button"
								onClick={() => setShowSideBar((prev) => !prev)}
							/>
						</div>
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
								onClick={() => {
									setShowBookingDropdown((prev) => !prev);
									setShowLoginDropdown(false);
								}}
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
									<div
										className="dropdown-content"
										ref={bookingRef}
									>
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
								onClick={() => {
									setShowLoginDropdown((prev) => !prev);
									setShowBookingDropdown(false);
								}}
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
									<div
										className="dropdown-content"
										ref={loginRef}
									>
										<ul>
											{session.value ? (
												<li
													onClick={() =>
														handleLogout()
													}
												>
													Logout
												</li>
											) : (
												<li
													onClick={() =>
														setShowLoginComponent(
															true
														)
													}
												>
													Sign In/Sign up
												</li>
											)}
										</ul>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div
					className={
						showSideBar
							? "sidebar-container show"
							: "sidebar-container"
					}
				>
					<ul>
						{session.value ? (
							<li
								className="sidebar-content"
								onClick={() => handleLogout()}
							>
								Logout
							</li>
						) : (
							<li
								className="sidebar-content"
								onClick={() => {
									setShowLoginComponent(true);
									setShowSideBar(false);
								}}
							>
								Login/Signup
							</li>
						)}
						<li className="sidebar-content">Search Buses</li>
						<li className="sidebar-content">Offers</li>
						<li className="sidebar-content">Refer & Earn</li>
						<li className="sidebar-content">Customer Care</li>
						<li className="sidebar-content">Get Ticket Details</li>
						<li className="sidebar-content">Terms and Condition</li>
						<li className="sidebar-content">Cancel Ticket</li>
					</ul>
					<div className="dark-container"></div>
				</div>
			</div>
		</>
	);
}

export default HeaderComponent;
