import React, { useContext, useMemo, useEffect, useState } from "react";
import MobileTitleComponent from "./MobileTitleComponent";
import "../../scss/MobilePassengerDetailsComponent.scss";
import arrowRight from "../../img/arrow-right.svg";
import MobilePassengerDetailsContainerFragment from "./MobilePassengerDetailsContainerFragment";
import MobilePassengerInputFragment from "./MobilePassengerInputFragment";
import MobilePassengerDetailsFragment from "./MobilePassengerDetailsFragment";
import uid from "uid";
import { DataContext } from "../../context/DataContext";
function MobilePassengerDetailsComponent({
	toggleVisibility,
	contactDetails,
	setContactDetails,
	placeOrder
}) {
	const passengerData = useContext(DataContext);
	const displayPassengers = useMemo(() => {
		return passengerData.data.map((passenger, index) => (
			<MobilePassengerDetailsFragment
				key={uid()}
				passengerNo={index + 1}
				seatNo={passenger.seatNo}
				inputGrp={passenger}
			/>
		));
	}, []);

	const [displayPlaceOrderBtn, setDisplayPlaceOrderBtn] = useState(false);

	useEffect(() => {
		const isComplete = (passenger) =>
			passenger.name !== "" && passenger.age !== "";
		const isContactFilled = () => contactDetails.email !== "" && contactDetails.phone !== ""
		setDisplayPlaceOrderBtn(isContactFilled && passengerData.data.every(isComplete));
	},[passengerData.data,contactDetails]);

	return (
		<div className="mb-passenger-details-container">
			<MobileTitleComponent style={{ justifyContent: "flex-start" }}>
				<span className="back-btn">
					<img
						className="arrow-icon btn"
						src={arrowRight}
						alt="back"
						onClick={() => toggleVisibility(false)}
					/>
				</span>
				<div className="title-content">Fill Passenger Details</div>
			</MobileTitleComponent>
			<MobilePassengerDetailsContainerFragment>
				<div className="mb-passenger-heading">
					Your Ticket will be sent to the below Email & Phone
				</div>
				<div className="mb-passenger-content">
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<label>Email ID</label>
						<MobilePassengerInputFragment
							type="email"
							placeholder="Enter Email"
							value={contactDetails["email"]}
							onChange={(value) =>
								setContactDetails((prev) => {
									return { ...prev, email: value };
								})
							}
						/>
						<label>Phone</label>
						<MobilePassengerInputFragment
							type="number"
							placeholder="Enter your phone no"
							value={contactDetails["phone"]}
							onChange={(value) => {
								setContactDetails((prev) => {
									return { ...prev, phone: value };
								});
							}}
						/>
						<div className="mb-send-updates-container">
							<span className="update-info">
								Send Booking details and updates on above
								WhatsApp number
							</span>
							<label className="switch">
								<input
									type="checkbox"
									checked={contactDetails["sendUpdates"]}
									onChange={(e) =>
										setContactDetails((prev) => {
											return {
												...prev,
												sendUpdates: e.target.checked,
											};
										})
									}
								/>
								<span className="slider round"></span>
							</label>
						</div>
					</form>
				</div>
			</MobilePassengerDetailsContainerFragment>
			{displayPassengers}
			{displayPlaceOrderBtn ? (
				<button
					className="mb-footer boarding-footer"
					onClick={() => placeOrder()}
				>
					Place your Order
				</button>
			) : (
				""
			)}
		</div>
	);
}

export default MobilePassengerDetailsComponent;
