import React,{useState} from "react";
import MobileTitleComponent from "./MobileTitleComponent";
import "../../scss/MobilePassengerDetailsComponent.scss";
import arrowRight from "../../img/arrow-right.svg";
import MobilePassengerDetailsContainerFragment from "./MobilePassengerDetailsContainerFragment";
import MobilePassengerInputFragment from "./MobilePassengerInputFragment";
import MobilePassengerDetailsFragment from "./MobilePassengerDetailsFragment";
function MobilePassengerDetailsComponent({ toggleVisibility }) {

    const [sendUpdates,setSendUpdates] = useState(true)
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
							type="text"
							placeholder="Enter Email"
						/>
						<label>Phone</label>
						<MobilePassengerInputFragment
							type="number"
							placeholder="Enter your phone no"
						/>
						<div className="mb-send-updates-container">
							<span className="update-info">
								Send Booking details and updates on above
								WhatsApp number
							</span>
							<label className="switch">
								<input
									type="checkbox"
									checked={sendUpdates}
									onChange={() =>
										setSendUpdates((prev) => !prev)
									}
								/>
								<span className="slider round"></span>
							</label>
						</div>
					</form>
				</div>
			</MobilePassengerDetailsContainerFragment>
			<MobilePassengerDetailsFragment/>
		</div>
	);
}

export default MobilePassengerDetailsComponent;
