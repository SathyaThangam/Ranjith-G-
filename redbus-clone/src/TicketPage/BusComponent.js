import React, { useState, useEffect, useContext } from "react";
import "../scss/BusComponent.scss";
import BusSeatsComponent from "./BusSeatsComponent";
import MobileBoardingPointsComponent from "./MobilePage/MobileBoardingPointsComponent";
import BoardingTicketComponent from "./BoardingTicketComponent";
import MobilePassengerDetailsComponent from "./MobilePage/MobilePassengerDetailsComponent";
import { DataContext } from "../context/DataContext";
import uid from "uid";
import { useHistory } from "react-router-dom";
function BusComponent({ data }) {
	const [show, setShow] = useState(false);
	const [boardingPoint, setBoardingPoint] = useState("");
	const [droppingPoint, setDroppingPoint] = useState("");
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [choosePoint, setChoosePoint] = useState("boarding");
	const [ticketShowStatus, setTicketShowStatus] = useState("");
	const [contactDetails, setContactDetails] = useState({
		email: "",
		phone: "",
		sendUpdates: true,
	});
	const [showPassengerDetailsForm, setShowPassengerDetailsForm] = useState(
		false
	);
	const toggleShow = () => setShow((prev) => !prev);

	const passengerData = useContext(DataContext);

	const history = useHistory();

	const placeOrder = () => {
		const order = {
			order_id: `Order#${uid(16)}`,
			price: selectedSeats.length * data["seat-price"],
			boardingPoint: boardingPoint,
			droppingPoint: droppingPoint,
			contactDetails: contactDetails,
			passengerData: passengerData.data,
			source: data["departure-stop"],
			destination: data["arrival-stop"],
		};
		console.log("Order", order);
		if (localStorage.getItem("getBusOrders") !== null) {
			const prevData = JSON.parse(
				localStorage.getItem("getBusOrders") || "[]"
			);
			localStorage.setItem(
				"getBusOrders",
				JSON.stringify([...prevData, order])
			);
		} else {
			const orderStr = JSON.stringify([order]);
			localStorage.setItem("getBusOrders", orderStr);
			console.log(orderStr);
		}
		console.log(JSON.parse(localStorage.getItem("getBusOrders")));
		history.push("/vieworders");
	};

	useEffect(() => {
		if (selectedSeats.length > 0) {
			passengerData.setData((prev) => {
				const duplicates = prev.filter((data) =>
					selectedSeats.includes(data.seatNo)
				);
				const newlySelected = selectedSeats.filter(
					(seat) => !duplicates.includes(seat)
				);
				const temp = newlySelected.map((seat) => {
					return {
						seatNo: seat,
						name: "",
						age: "",
						gender: "Male",
					};
				});
				return temp;
			});
		}
	}, [selectedSeats]);

	useEffect(() => {
		if (ticketShowStatus === "reset") {
			setDroppingPoint("");
			setBoardingPoint("");
			setTicketShowStatus("hide");
		} else if (droppingPoint === "" || boardingPoint === "")
			setTicketShowStatus("hide");
		else if (droppingPoint !== "" && boardingPoint !== "")
			setTicketShowStatus("show");
	}, [droppingPoint, boardingPoint, ticketShowStatus]);

	return (
		<>
			<div className="bus-container">
				<div className="bus-content">
					<div className="bus-content-top">
						<div className="bus-details">
							<div className="bus-details top">
								<span className="f-bold">
									{data["operator-name"]}
								</span>
							</div>
							<div className="bus-details bottom">
								{data["bus-name"]}
							</div>
						</div>
						<div className="bus-details">
							<div className="bus-details top">
								<span className="f-bold">
									{data["departure-time"]}
								</span>
							</div>
							<div className="bus-details bottom">
								{data["departure-stop"]}
							</div>
						</div>
						<div className="bus-details">
							<div className="bus-details top">
								{data["travel-time"]}
							</div>
						</div>
						<div className="bus-details">
							<div className="bus-details top">
								{data["arrival-time"]}
							</div>
							<div className="bus-details bottom">
								{data["arrival-stop"]}
							</div>
						</div>
						<div className="bus-details">
							<div className="bus-details top">
								<span className="rating">
									{data["ratings"]}
								</span>
							</div>
							<div className="bus-details bottom">
								{data["no-of-ratings"]}
							</div>
						</div>
						<div className="bus-details">
							<div className="bus-details top">
								INR{" "}
								<span className="f-bold">
									{data["seat-price"]}
								</span>
							</div>
						</div>
						<div className="bus-details">
							<div className="bus-details top">
								<span className="red-bar"></span>
								<div className="bus-details bottom">
									<span>
										{data["no-of-seats"]} Seats Available
									</span>
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
						<div onClick={toggleShow}>
							Boarding & Dropping points
						</div>
						<div onClick={toggleShow}>Reviews</div>
						<div onClick={toggleShow}>Booking Policies</div>
					</div>
					<button className="seats-btn" onClick={toggleShow}>
						VIEW SEATS
					</button>
				</div>
				{show ? (
					<div className="dropdown-content">
						<div className="bus-seats-container">
							<div className="dropdown-announcement">
								Click on the Available seat to proceed with your
								transaction
							</div>
							<BusSeatsComponent
								seats={data["no-of-seats"]}
								handleSeatClick={setSelectedSeats}
							/>
						</div>
						{selectedSeats.length > 0 ? (
							<div className="boarding-container">
								{ticketShowStatus === "hide" ? (
									<>
										<div className="boarding-container-header">
											<span
												className={
													choosePoint === "boarding"
														? "selected"
														: ""
												}
												onClick={() => {
													setChoosePoint("boarding");
												}}
											>
												Select Boarding Point{" "}
											</span>
											<span
												className={
													choosePoint === "dropping"
														? "selected"
														: ""
												}
												onClick={() =>
													setChoosePoint("dropping")
												}
											>
												Select Dropping Point
											</span>
										</div>
										{choosePoint === "boarding" ? (
											<MobileBoardingPointsComponent
												key={data["id"]}
												data={data["bus-boarding-pts"]}
												heading="Pick your stop"
												boardingPoint={boardingPoint}
												setBoardingPoint={
													setBoardingPoint
												}
											/>
										) : (
											<MobileBoardingPointsComponent
												key={data["id"]}
												data={data["bus-dropping-pts"]}
												heading="Pick your stop"
												boardingPoint={droppingPoint}
												setBoardingPoint={
													setDroppingPoint
												}
											/>
										)}
									</>
								) : (
									<BoardingTicketComponent
										setTicketShowStatus={
											setTicketShowStatus
										}
										setShowPassengerDetailsForm={
											setShowPassengerDetailsForm
										}
										seatNum={selectedSeats}
										seatPrice={data["seat-price"]}
										departure={{
											time: data["departure-time"],
											stop: data["departure-stop"],
										}}
										arrival={{
											time: data["arrival-time"],
											stop: data["arrival-stop"],
										}}
									/>
								)}
							</div>
						) : (
							""
						)}
					</div>
				) : (
					""
				)}
			</div>
			{showPassengerDetailsForm ? (
				<div
					className="passenger-details-container"
					onClick={() => setShowPassengerDetailsForm(false)}
				>
					<div
						className="passenger-details-content"
						onClick={(e) => e.stopPropagation()}
					>
						<MobilePassengerDetailsComponent
							toggleVisibility={setShowPassengerDetailsForm}
							contactDetails={contactDetails}
							setContactDetails={setContactDetails}
							placeOrder={() => placeOrder()}
						/>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
}

export default BusComponent;
