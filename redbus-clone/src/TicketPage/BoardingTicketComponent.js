import React from "react";
import "../scss/BoardingTicketComponent.scss";
function BoardingTicketComponent({
	departure,
	arrival,
	seatNum,
	seatPrice,
	setTicketShowStatus,
	setShowPassengerDetailsForm,
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
						<h1>{departure.stop}</h1>
						<span className="f-bold">{departure.time}</span>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div className="boarding-ticket-stop">
					<div>
						<h1>{arrival.stop}</h1>
						<span className="f-bold">{arrival.time}</span>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="boarding-ticket-seat-details f-bold">
				<span className="">Seat No.</span>
				<span>{seatNum.toString()}</span>
			</div>
			<div className="boarding-ticket-fare-details">
				<div className="f-bold">Fare Details</div>
				<div className="amount-details">
					<div>
						<h1>Amount</h1>
						<span>Taxes will be calculated during payment</span>
					</div>
					<div className="amount f-bold">
						INR {(seatNum.length * seatPrice).toFixed(2)}
					</div>
				</div>
			</div>
			<div className="fare-details-container">
				<button className="fare-details-btn">Show Fare Details</button>
			</div>
			<button
				className="booking-ticket-btn"
				onClick={() => setShowPassengerDetailsForm(true)}
			>
				Proceed to Book
			</button>
		</div>
	);
}

export default BoardingTicketComponent;
