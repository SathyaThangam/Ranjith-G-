import React, { useState, useEffect, useContext } from "react";
import InputComponent from "./InputComponent";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import Modal from "@material-ui/core/Modal";
import MapComponent from "./MapComponent";
import {
	getGeolocation,
	formatAlert,
	validateEmail,
	validatePassword,
	validateConfirmPassword,
} from "../helpers/helper";
import { postRequest } from "../helpers/request-helper";
import { useSelector, useDispatch } from "react-redux";
import { setCoordinates } from "../redux";
import AlertComponent from "./AlertComponent";
import { SessionContext } from "../context/SessionContext";
function SignupComponent(props) {
	const [center, setCenter] = useState({ lat: 28.6448, lng: 77.216721 });
	const [signupEmail, setSignupEmail] = useState("");
	const [signupPwd, setSignupPwd] = useState("");
	const [signupCPwd, setSignupCPwd] = useState("");
	const [locationModal, setLocationModal] = useState(false);
	const [locationState, setLocationState] = useState(false); //check if user selected their location
	const [alert, setAlert] = useState(<></>);

	//redux
	const coords = useSelector((state) => state.coordsStore);
	const dispatch = useDispatch();

	//context
	const session = useContext(SessionContext);

	useEffect(() => {
		getGeolocation()
			.then((location) => {
				if (location !== null && location !== undefined) {
					setCenter(location);
					dispatch(setCoordinates(location));
				}
			}) //print error to see the location access error
			.catch((err) =>
				setAlert((prev) =>
					formatAlert(
						prev,
						<AlertComponent>
							Allow location permission to access
						</AlertComponent>
					)
				)
			);
	});

	// const [coords, setCoords] = useState({ lat: 0.0, lng: 0.0 });

	//Signup
	const userSignup = () => {
		setAlert(<></>);

		if (
			validateEmail(signupEmail) &&
			validatePassword(signupPwd) &&
			validateConfirmPassword(signupPwd, signupCPwd) &&
			locationState
		) {
			//Data for server
			const userData = {
				email: signupEmail,
				password: signupPwd,
				location: coords,
			};

			//Connect to server
			postRequest("/user/signup", userData)
				.then((response) => {
					//get response body
					const { message } = response.data;
					if (message) {
						if (message === "success") {
							session.setSession(true);
							setAlert(
								<AlertComponent className="success">
									Account created!
								</AlertComponent>
							);
							props.handleModalClose();
							if (props.location.pathname === "/login")
								props.history.goBack();
						} else {
							setSignupEmail("");
							setSignupPwd("");
							setSignupCPwd("");
							if (message === "duplication") {
								setAlert((prev) =>
									formatAlert(
										prev,
										<AlertComponent>
											Account already exists
										</AlertComponent>
									)
								);
							} else if (message === "Invalid") {
								setAlert((prev) =>
									formatAlert(
										prev,
										<AlertComponent>
											Invalid Email/Password
										</AlertComponent>
									)
								);
							}
						}
					}
				})
				.catch((err) => console.error(err));
		}
		//Validation Error
		else {
			if (!validateEmail(signupEmail))
				setAlert((prev) =>
					formatAlert(
						prev,
						<AlertComponent>Incorrect Email</AlertComponent>
					)
				);
			if (!validatePassword(signupPwd)) {
				if (signupPwd.length < 8 || signupPwd.length > 16) {
					setAlert((prev) =>
						formatAlert(
							prev,
							<AlertComponent>
								Incorrect Password: Password should have 8 to 16
								characters
							</AlertComponent>
						)
					);
				} else {
					setAlert((prev) =>
						formatAlert(
							prev,
							<AlertComponent>
								Incorrect Password: Password should contain at
								least one lowercase letter, one uppercase
								letter, one numeric digit, and one special
								character
							</AlertComponent>
						)
					);
				}
			}

			if (!validateConfirmPassword(signupPwd, signupCPwd))
				setAlert((prev) =>
					formatAlert(
						prev,
						<AlertComponent>Passwords Doesn't match</AlertComponent>
					)
				);

			if (!locationState) {
				setAlert((prev) =>
					formatAlert(
						prev,
						<AlertComponent>
							Please select your location
						</AlertComponent>
					)
				);
			}
		}
	};

	return (
		<div className="tab-content">
			<InputComponent
				label="Email address"
				placeholder="Email-id"
				type="email"
				value={signupEmail}
				onChange={(e) => setSignupEmail(e.target.value)}
			/>
			<InputComponent
				label="Password"
				placeholder="Password"
				type="password"
				value={signupPwd}
				onChange={(e) => setSignupPwd(e.target.value)}
			/>
			<InputComponent
				label="Confirm Password"
				placeholder="Confirm Password"
				type="password"
				value={signupCPwd}
				onChange={(e) => setSignupCPwd(e.target.value)}
			/>
			<InputComponent
				className={locationState ? "success" : ""}
				placeholder="Location"
				type="button"
				value={`latitude:${coords.lat} longitude:${coords.lng}`}
				onClick={() => setLocationModal(true)}
			/>
			<OutlinedButtonComponent
				className=" "
				innerHTML="Signup for a new Journey ▶"
				onClick={userSignup}
			/>

			<Modal open={locationModal} onClose={() => setLocationModal(false)}>
				<MapComponent
					center={center}
					setLocationState={setLocationState}
					zoom={8}
				/>
			</Modal>
			<div className="tab-content-bottom">
				<button className="underlined-btn" onClick={props.toggleTab}>
					Know your way? Log in..
				</button>
			</div>
			{alert}
		</div>
	);
}

export default SignupComponent;
