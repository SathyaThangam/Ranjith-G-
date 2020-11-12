import React, { useState, useEffect, useContext } from "react";
import { Stage, Layer, Path } from "react-konva";
import SeatComponent from "../SeatComponent";
import uid from "uid";
import arrowRight from "../../img/arrow-right.svg";
import MobileBoardingPointsComponent from "./MobileBoardingPointsComponent";
import MobileOverlayComponent from "./MobileOverlayComponent";
import "../../scss/MobileBusSeatsComponent.scss";
import MobileTitleComponent from "./MobileTitleComponent";
import MobilePassengerDetailsComponent from "./MobilePassengerDetailsComponent";
import { DataContext, withDataContext } from "../../context/DataContext";
function MobileBusSeatsComponent({
	setShowSeats,
	busData,
	boardingPoint,
	setBoardingPoint,
	droppingPoint,
	setDroppingPoint,
}) {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [displayBoardingPoints, setdisplayBoardingPoints] = useState(false);
	const [
		displayPassengerDetailsComp,
		setDisplayPassengerDetailsComp,
	] = useState(false);
	const [contactDetails, setContactDetails] = useState({
		email: "",
		phone: "",
		sendUpdates: true,
	});
	const passengerData = useContext(DataContext);
	const width = window.innerWidth;
	const vw = width / 100;
	const height = window.innerHeight;

	const placeOrder = () => {
		const order = {
			"order_id": `Order#${uid(16)}`,
			"price":selectedSeats.length*busData["seat-price"],
			"boardingPoint":boardingPoint,
			"droppingPoint":droppingPoint,
			"contactDetails":contactDetails,
			"passengerData":passengerData.data
		}
		console.log("Order",order);
		if(localStorage.getItem("getBusOrders") !== null){
			const prevData = JSON.parse(localStorage.getItem("getBusOrders")  || "[]");
			localStorage.setItem(
				"getBusOrders",
				JSON.stringify([...prevData, order])
			);
		}
		else{
			const orderStr = JSON.stringify([order]);
			localStorage.setItem("getBusOrders",orderStr);
			console.log(orderStr);
		}
		console.log(JSON.parse(localStorage.getItem("getBusOrders")));
	}

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
		if (!displayPassengerDetailsComp) 
			{
				setSelectedSeats([]);
				setdisplayBoardingPoints(false)
			}
	}, [displayPassengerDetailsComp]);

	const handleSeatClick = (seatPosition) => {
		setSelectedSeats((prev) => {
			const isSelected = prev.includes(seatPosition);
			if (isSelected) {
				return prev.filter((seat) => seat !== seatPosition);
			}
			return [...prev, seatPosition];
		});
	};

	const [seats] = useState(() => {
		const noOfSeats = busData["no-of-seats"];
		const seats = [];
		const cols = [width - vw * 5, width - vw * 35, width - vw * 65];
		const rows = Math.floor(noOfSeats / 3);
		let remainingSeats = noOfSeats % 3;
		let y = 70;
		let seatNum = 1;
		cols.forEach((col) => {
			for (let i = 0; i < rows; i++) {
				seats.push(
					<SeatComponent
						key={uid()}
						x={col}
						y={y}
						position={seatNum++}
						rotation={90}
						strokeColor="red"
						onClick={handleSeatClick}
					/>
				);
				y += 60;
			}
			if (remainingSeats > 0) {
				seats.push(
					<SeatComponent
						key={uid()}
						x={col}
						y={y}
						position={seatNum++}
						rotation={90}
						strokeColor="red"
						onClick={handleSeatClick}
					/>
				);
				remainingSeats--;
			}
			y = 70;
		});

		return seats;
	});

	if (displayBoardingPoints && displayPassengerDetailsComp)
		return (
			<MobilePassengerDetailsComponent
				toggleVisibility={setDisplayPassengerDetailsComp}
				contactDetails={contactDetails}
				setContactDetails={setContactDetails}
				placeOrder={placeOrder}
			/>
		);

	if (displayBoardingPoints) {
		const boardingData = busData["bus-boarding-pts"];
		const droppingData = busData["bus-dropping-pts"];
		return (
			<MobileOverlayComponent style={{ backgroundColor: "#eee" }}>
				<MobileTitleComponent>
					<span className="back-btn">
						<img
							className="arrow-icon btn"
							src={arrowRight}
							alt="back"
							onClick={() => setdisplayBoardingPoints(false)}
						/>
					</span>
					<div className="title-content">
						Select Boarding and Dropping points
					</div>
				</MobileTitleComponent>
				<MobileBoardingPointsComponent
					data={boardingData}
					heading="Select Boarding Points"
					boardingPoint={boardingPoint}
					setBoardingPoint={setBoardingPoint}
				/>
				<MobileBoardingPointsComponent
					data={droppingData}
					heading="Select Dropping Points"
					boardingPoint={droppingPoint}
					setBoardingPoint={setDroppingPoint}
				/>
				{droppingPoint !== "" && boardingPoint !== "" ? (
					<button
						className="mb-footer boarding-footer"
						onClick={() => setDisplayPassengerDetailsComp(true)}
					>
						Fill Passenger Details
					</button>
				) : (
					""
				)}
			</MobileOverlayComponent>
		);
	}

	return (
		<div className="mb-bus-seats-container">
			<MobileTitleComponent style={{ justifyContent: "flex-start" }}>
				<span
					className="mb-title-close"
					onClick={() => setShowSeats(false)}
				>
					X
				</span>
				<div> Select Your seats</div>
			</MobileTitleComponent>
			<div style={{ backgroundColor: "#eee" }}>
				<Stage width={width} height={height}>
					<Layer>
						<Path
							x={width - vw * 33}
							y={0}
							data="M 5 5 C 5 2 9 2 9 5 C 9 8 5 8 5 5 M 6 3 L 7 5 M 9 5 L 7 5 M 6 7 L 7 5 Z"
							stroke="black"
							strokeWidth={0.2}
							scaleX={8}
							fill="transparent"
							scaleY={8}
						/>
						{seats}
					</Layer>
				</Stage>
			</div>
			<div className="mb-seat-result-container">
				<div className="mb-selected-seats">
					<span>
						{selectedSeats.length} Seats |{" "}
						{selectedSeats.toString()}{" "}
					</span>
					<span className="f-bold">
						₹{" "}
						{(selectedSeats.length * busData["seat-price"]).toFixed(
							2
						)}
					</span>
				</div>
				{selectedSeats.length > 0 ? (
					<button
						className="mb-seat-result-options f-bold"
						onClick={() => setdisplayBoardingPoints(true)}
					>
						Select Boarding and Dropping Points
						<img
							src={arrowRight}
							alt="Select Boarding and Dropping Points"
						/>
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default withDataContext(MobileBusSeatsComponent);
