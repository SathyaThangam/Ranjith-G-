import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
import Modal from "@material-ui/core/Modal";
import MapComponent from "./MapComponent";
import { getGeolocation } from "../helpers/helper";
import { connect } from "react-redux";
import { setCoordinates } from "../redux";
function SignupComponent(props) {
	const [center, setCenter] = useState({ lat: 28.6448, lng: 77.216721 });
	useEffect(() => {
		getGeolocation()
			.then((location) => {
				if (location !== null && location !== undefined)
					setCenter(location);
				props.setCoords(location);
			}) //print error to see the location access error
			.catch((err) => props.setLocationErrorMessage(true));
	});

	const [locationModal, setLocationModal] = useState(false);
	// const [coords, setCoords] = useState({ lat: 0.0, lng: 0.0 });
	// const [locationState, setLocationState] = useState(false)

	return (
		<div className="tab-content">
			<InputComponent
				label="Email address"
				placeholder="Email-id"
				type="email"
				value={props.signupEmail}
				onChange={props.onSignupEmailChange}
			/>
			<InputComponent
				label="Password"
				placeholder="Password"
				type="password"
				value={props.signupPwd}
				onChange={props.onSignupPwdChange}
			/>
			<InputComponent
				label="Confirm Password"
				placeholder="Confirm Password"
				type="password"
				value={props.signupCPwd}
				onChange={props.onSignupCPwdChange}
			/>
			<InputComponent
				className={props.locationState ? "success" : ""}
				placeholder="Location"
				type="button"
				value={`latitude:${props.coords.lat} longitude:${props.coords.lng}`}
				onClick={() => setLocationModal(true)}
			/>
			<OutlinedButtonComponent
				className=" "
				innerHTML="Signup for a new Journey ▶"
				onClick={props.userSignup}
			/>

			<Modal open={locationModal} onClose={() => setLocationModal(false)}>
				<MapComponent
					center={center}
					setLocationState={props.setLocationState}
					zoom={8}
				/>
			</Modal>
			<div className="tab-content-bottom">
				<button className="underlined-btn" onClick={props.toggleTab}>
					Know your way? Log in..
				</button>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		coords: state.coordsStore,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCoords: (newCoords) => dispatch(setCoordinates(newCoords)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
