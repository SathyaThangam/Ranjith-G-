import React, { useState } from "react";
import { Stage, Layer, Path } from "react-konva";
import SeatComponent from "../SeatComponent";
import uid from "uid";
import "../../scss/MobileBusSeatsComponent.scss";
function MobileBusSeatsComponent({ setShowSeats, noOfSeats }) {
	const text = (value) => console.log("hello text", value);
	const width = window.innerWidth;
	const vw = width/100;
	const height = window.innerHeight;

	const [seats] = useState(() => {
		const seats = [];
		const cols = [width - vw*5, width - vw * 35, width - vw * 65];
		const rows = Math.floor(noOfSeats / 3);
		let remainingSeats = noOfSeats % 3;
		let y = 70;
		cols.forEach((col) => {
			for (let i = 0; i < rows; i++) {
				seats.push(
					<SeatComponent
						key={uid()}
						x={col}
						y={y}
						rotation={90}
						disabled={i % 2 === 0}
						strokeColor="red"
						onClick={text}
					/>
				);
				y += 60;
			}
			if(remainingSeats > 0){
				seats.push(
					<SeatComponent
						key={uid()}
						x={col}
						y={y}
						rotation={90}
						strokeColor="red"
					/>
				);
				remainingSeats--;
			}
			y = 70;
		});

		return seats;
	});

	return (
		<div className="mobile-bus-seats-container">
			<div className="mobile-filter-header">
				<span className="close" onClick={() => setShowSeats(false)}>
					X
				</span>
				<div> Select Your seats</div>
			</div>
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
		</div>
	);
}

export default MobileBusSeatsComponent;
