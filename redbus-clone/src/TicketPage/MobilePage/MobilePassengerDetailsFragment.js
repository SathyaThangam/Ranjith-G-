import React, { useContext } from "react";
import MobilePassengerDetailsContainerFragment from "./MobilePassengerDetailsContainerFragment";
import MobilePassengerInputFragment from "./MobilePassengerInputFragment";
import "../../scss/MobilePassengerDetailsComponent.scss";
import {DataContext} from '../../context/DataContext'
function MobilePassengerDetailsFragment({
	passengerNo,
	seatNo,
	inputGrp,
}) {
	const passengerData = useContext(DataContext);

	const handlePassengerInput = (seatNo, valName, value) => {
		const index = passengerData.data.findIndex(
			(passenger) => passenger.seatNo === seatNo
		);
		if (index !== -1) {
			passengerData.setData((prev) => {
				const temp = [...prev];
				temp[index][valName] = value;
				return temp;
			});
		}
	};

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
					Passenger {passengerNo} | Seat {seatNo}
				</div>
				<div className="mb-passenger-content">
					<label>Name</label>
					<MobilePassengerInputFragment
						type="text"
						placeholder="Enter your Name"
						value={inputGrp["name"]}
						onChange={(value) => {
							handlePassengerInput(seatNo, "name", value);
						}}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<div>
							<label>Age</label>
							<MobilePassengerInputFragment
								type="number"
								placeholder="Enter Age"
								value={inputGrp["age"]}
								onChange={(value) =>
									handlePassengerInput(seatNo, "age", value)
								}
							/>
						</div>
						<div>
							<label>Gender</label>
							<div className="switch-two-values">
								<button
									onClick={() =>
										handlePassengerInput(
											seatNo,
											"gender",
											"Male"
										)
									}
									className={
										inputGrp["gender"] === "Male"
											? "selected"
											: ""
									}
								>
									Male
								</button>
								<button
									onClick={() =>
										handlePassengerInput(
											seatNo,
											"gender",
											"Female"
										)
									}
									className={
										inputGrp["gender"] === "Female"
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

export default (MobilePassengerDetailsFragment);
