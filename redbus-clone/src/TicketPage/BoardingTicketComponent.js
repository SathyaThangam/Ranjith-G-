import React from "react";
import "../scss/BoardingTicketComponent.scss";
function BoardingTicketComponent({
	departure,
	arrival,
	seatNum,
	totalPrice,
	setTicketShowStatus,
}) {
	return (
		<div className="boarding-ticket-container">
			<div className="boarding-ticket-header">
				<div className="f-bold">Boarding & Dropping</div>
				<button onClick={() => setTicketShowStatus("reset")}>
					change
				</button>
			</div>
			<div className="boarding-ticket-travel-details">
				<div className="boarding-ticket-stop">
					<div>
						<h1>Borivali-(W) Neeta....</h1>
						<span className="f-bold">07:15</span>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div className="boarding-ticket-stop">
					<div>
						<h1>Wakad Indira College</h1>
						<span className="f-bold">07:15</span>
					</div>
					<p>Wakad Indira College</p>
				</div>
			</div>
			<div className="boarding-ticket-seat-details f-bold">
				<span className="">Seat No.</span>
				<span>18</span>
			</div>
			<div className="boarding-ticket-fare-details">
				<div className="f-bold">Fare Details</div>
				<div className="amount-details">
					<div>
						<h1>Amount</h1>
						<span>Taxes will be calculated during payment</span>
					</div>
					<div className="amount f-bold">INR 399.00</div>
				</div>
			</div>
			<div className="fare-details-container">
				<button className="fare-details-btn">Show Fare Details</button>
			</div>
			<button className="booking-ticket-btn">Proceed to Book</button>
		</div>
	);
}

export default BoardingTicketComponent;
