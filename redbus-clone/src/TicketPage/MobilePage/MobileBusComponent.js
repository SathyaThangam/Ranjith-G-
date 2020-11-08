import React from "react";
import "../../scss/MobileBusComponent.scss";
import uid from "uid";
function MobileBusComponent({ busData, setNoOfSeats, setShowSeats }) {
	return (
		<div
			className="mobile-bus-container"
			onClick={() => {
				setNoOfSeats(busData["no-of-seats"]);
				setShowSeats(true);
			}}
		>
			<div className="stops">{busData["rest-stops"]} Rest stop</div>
			<div>
				<span className="bus-timing">
					<b>{busData["departure-time"]}</b> -{" "}
					{busData["arrival-time"]}
				</span>
				<span className="bus-price">₹ {busData["seat-price"]}</span>
			</div>
			<div className="other-info">
				<span>{busData["travel-time"]} </span>
				<span>•</span>
				<span> {busData["no-of-seats"]} Seats</span>
			</div>
			<div className="operator-details">
				<div className="operator-details-content">
					<div>
						<b>{busData["operator-name"]}</b>
					</div>
					<div>{busData["bus-name"]}</div>
				</div>
				<div className="tags">
					<div className="green-badge">{busData["ratings"]}</div>
					<div className="grey-badge">{busData["no-of-ratings"]}</div>
				</div>
			</div>
			<div className="tags">
				{busData["tags"].map((tag) => (
					<div key={uid(8)} className="grey-badge">
						{tag}
					</div>
				))}
			</div>
		</div>
	);
}

export default MobileBusComponent;
