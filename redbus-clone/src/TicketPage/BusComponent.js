import React, { useState } from "react";
import "../scss/BusComponent.scss";
import BusSeatsComponent from "./BusSeatsComponent";
function BusComponent() {
	const [show, setShow] = useState(false);
	const toggleShow = () => setShow((prev) => !prev);
	return (
		<div className="bus-container">
			<div className="bus-content"></div>
			<div className="seat-container">
				<div className="bus-options">
					<div onClick={toggleShow}>Safety+</div>
					<div onClick={toggleShow}>Amenities</div>
					<div onClick={toggleShow}>Bus Photos</div>
					<div onClick={toggleShow}>Boarding & Dropping points</div>
					<div onClick={toggleShow}>Reviews</div>
					<div onClick={toggleShow}>Booking Policies</div>
				</div>
				<button className="seats-btn" onClick={toggleShow}>
					VIEW SEATS
				</button>
			</div>
			{show ? (
				<div className="dropdown-content">
					<div className="dropdown-announcement">
						Click on the Available seat to proceed with your
						transaction
					</div>
					<BusSeatsComponent />
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default BusComponent;
