import React, { useState } from "react";
import MobilePassengerDetailsContainerFragment from "./MobilePassengerDetailsContainerFragment";
import MobilePassengerInputFragment from "./MobilePassengerInputFragment";
import "../../scss/MobilePassengerDetailsComponent.scss";
function MobilePassengerDetailsFragment({
	passengerNo,
	seatNo,
	inputGrp,
	setInputGrp,
}) {
	const [genderSwitch, setGenderSwitch] = useState("Male");
	return (
		<MobilePassengerDetailsContainerFragment>
			<div
				style={{
					border: "1px solid #ccc",
					borderRadius: "3px",
					padding: "15px",
					paddingBottom: "30px",
				}}
			>
				<div className="mb-passenger-heading">
					Passenger 1 | Seat 23
				</div>
				<div className="mb-passenger-content">
					<label>Name</label>
					<MobilePassengerInputFragment
						type="text"
						placeholder="Enter your Name"
					/>
					<div style={{ display: "flex",justifyContent:"space-between" }}>
						<div>
							<label>Age</label>
							<MobilePassengerInputFragment
								type="number"
								placeholder="Enter Age"
							/>
						</div>
						<div>
                            <label>Gender</label>
							<div className="switch-two-values">
								<button
									onClick={() => setGenderSwitch("Male")}
									className={
										genderSwitch === "Male"
											? "selected"
											: ""
									}
								>
									Male
								</button>
								<button
									onClick={() => setGenderSwitch("Female")}
									className={
										genderSwitch === "Female"
											? "selected"
											: ""
									}
								>
									Female
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MobilePassengerDetailsContainerFragment>
	);
}

export default MobilePassengerDetailsFragment;
