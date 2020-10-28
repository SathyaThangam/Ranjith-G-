import React,{useState} from "react";
import "../../scss/MobileBusComponent.scss";
import MobileBusSeatsComponent from "./MobileBusSeatsComponent";
function MobileBusComponent() {

    const [show, setShow] = useState(false)

    return (
		<div
			className="mobile-bus-container"
			onClick={() => setShow(prev => !prev)}
		>
			<div className="stops">1 Rest stop</div>
			<div className="">
				<span className="bus-timing">
					<b>13:15</b> - 18:10
				</span>
				<span className="bus-price">₹ 475</span>
			</div>
			<div className="other-info">
				<span>4h 55m </span>
				<span>•</span>
				<span> 22 Seats</span>
			</div>
			<div className="operator-details">
				<div className="operator-details-content">
					<div>
						<b>Neeta tours and travels</b>
					</div>
					<div>Bharat Benz A/C Seater (2+1)</div>
				</div>
				<div className="tags">
					<div className="red-badge">1.6</div>
					<div className="grey-badge">5</div>
				</div>
			</div>
			<div className="tags">
				<div className="grey-badge">RESCHEDULABLE</div>
				<div className="grey-badge">RESCHEDULABLE</div>
			</div>
			{show ? (
				<div className="dropdown-content">
					<div className="dropdown-announcement">
						Click on the Available seat to proceed with your
						transaction
					</div>
					<MobileBusSeatsComponent />
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default MobileBusComponent;
