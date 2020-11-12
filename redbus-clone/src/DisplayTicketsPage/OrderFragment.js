import React from "react";
import "../scss/OrderFragment.scss";
function OrderFragment({ order }) {
	return (
		<div className="order-fragment-container">
			<h3>{order.order_id}</h3>
			<div>
				<span>
					{order.boardingPoint} to {order.droppingPoint}
				</span>
				<span className="f-bold">{order.price}</span>
			</div>
			<div>
				<p>Contact Details</p>
				<div>
					<label>Email:</label>
					<span>{order.contactDetails.email}</span>
				</div>
				<div>
					<label>Phone No:</label>
					<span>{order.contactDetails.phone}</span>
				</div>
			</div>
			<div>
				<label>Passenger Details</label>
				{order.passengerData.map((passenger) => {
					return (
						<div>
							<div>
								<label>Seat {passenger.seatNo}</label>
							</div>
							<div>
								<label>Name: </label>
								<span>{passenger.name}</span>
							</div>
							<div>
								<label>Age: </label>
								<span>{passenger.age}</span>
							</div>
							<div>
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
