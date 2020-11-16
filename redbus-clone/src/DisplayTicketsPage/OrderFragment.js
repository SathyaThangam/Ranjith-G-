import React from "react";
import "../scss/OrderFragment.scss";
import arrowRight from "../img/arrow-right.svg";
function OrderFragment({ order }) {
	return (
		<div className="order-fragment-container">
			<div className="heading">
				<h4>{order.source}</h4> <span>to</span>{" "}
				<h4>{order.destination}</h4>
			</div>
			<h4>{order.order_id}</h4>
			<div className="segment">
				<div className="flex-center">
					<span>{order.boardingPoint}</span>
					<img src={arrowRight} alt="to" className="arrow-icon btn" />
					<span>{order.droppingPoint}</span>
				</div>
				<span className="f-bold"> INR {order.price}</span>
			</div>
			<div>
				<p className="order-fragment-heading">Contact Details</p>
				<div className="flex-sb">
					<label>Email:</label>
					<span> {order.contactDetails.email}</span>
				</div>
				<div className="flex-sb">
					<label>Phone No:</label>
					<span> {order.contactDetails.phone}</span>
				</div>
			</div>
			<div>
				<p className="order-fragment-heading">Passenger Details</p>
				{order.passengerData.map((passenger) => {
					return (
						<div>
							<div className="flex-sb">
								<label>Seat </label>
								<span>{passenger.seatNo}</span>
							</div>
							<div className="flex-sb">
								<label>Name: </label>
								<span>{passenger.name}</span>
							</div>
							<div className="flex-sb">
								<label>Age: </label>
								<span>{passenger.age}</span>
							</div>
							<div className="flex-sb">
								<label>Gender: </label>
								<span>{passenger.gender}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrderFragment;
