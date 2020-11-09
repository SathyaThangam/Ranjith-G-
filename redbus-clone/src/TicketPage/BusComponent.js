import React, { useState } from "react";
import "../scss/BusComponent.scss";
import BusSeatsComponent from "./BusSeatsComponent";
function BusComponent() {
	const [show, setShow] = useState(false);
	const toggleShow = () => setShow((prev) => !prev);
	return (
		<div className="bus-container">
			<div className="bus-content">
				<div className="bus-content-top">
					<div className="bus-details">
						<div className="bus-details top">
							<span className="f-bold">
								Neeta Tours and travels
							</span>
						</div>
						<div className="bus-details bottom">
							Bharat Benz A/C Seater (2+1)
						</div>
					</div>
					<div className="bus-details">
						<div className="bus-details top">
							<span className="f-bold">07:15</span>
						</div>
						<div className="bus-details bottom">Borivali West</div>
					</div>
					<div className="bus-details">
						<div className="bus-details top">04h 55m</div>
					</div>
					<div className="bus-details">
						<div className="bus-details top">12:10</div>
						<div className="bus-details bottom">Wakad</div>
					</div>
					<div className="bus-details">
						<div className="bus-details top">
							<span className="rating">3.5</span>
						</div>
						<div className="bus-details bottom">102</div>
					</div>
					<div className="bus-details">
						<div className="bus-details top">
							INR <span className="f-bold">380</span>
						</div>
					</div>
					<div className="bus-details">
						<div className="bus-details top">
							<span className="red-bar"></span>
							<div className="bus-details bottom">
								<span>22 Seats Available</span>
							</div>
						</div>
					</div>
				</div>
			</div>
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
