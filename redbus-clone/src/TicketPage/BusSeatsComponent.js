import React, { useCallback,memo } from "react";
import { Stage, Layer, Path } from "react-konva";
import SeatComponent from "./SeatComponent";
import uid from "uid";
function BusSeatsComponent({ seats, handleSeatClick }) {
	const rows = Math.floor(seats / 3);
	let remainingSeats = seats % 3;
	const width = 70 + (rows + 1) * 45;
	const style = {
		width: `${width}px`,
		height: "176px",
		backgroundColor: "#ddd",
		marginLeft: "30px",
		marginTop: "10px",
		color: "#07a31c",
	};
	// const appendAndReturnNewArray = (arr, value) => arr.push(value);
	const genSeats = useCallback((remainingSeats, rows) => {
		let tempSeats = [];
		let x = 70,
			y = [-5, 45, 115];
		let seatNum = 1;

		const seatOnClick = (seatPosition) =>
			handleSeatClick((prev) => {
				const isSelected = prev.includes(seatPosition);
				if (isSelected) {
					return prev.filter((seat) => seat !== seatPosition);
				}
				return [...prev, seatPosition];
			});

		y.forEach((col) => {
			for (let index = 0; index < rows; index++) {
				tempSeats.push(
					<SeatComponent
						key={uid()}
						x={x}
						y={col}
						disabled={index % 6 === 0}
						strokeColor="red"
						position={seatNum++}
						onClick={seatOnClick}
					/>
				);
				x += 40;
			}
			if (remainingSeats-- > 0) {
				tempSeats.push(
					<SeatComponent
						key={uid()}
						x={x}
						y={col}
						strokeColor="red"
						position={seatNum++}
						onClick={seatOnClick}
					/>
				);
			}
			x = 70;
		});

		return tempSeats;
	}, [handleSeatClick]);

	return (
		<div style={style}>
			<Stage width={width} height={176}>
				<Layer>
					<Path
						x={0}
						y={0}
						data="M 5 5 C 5 2 9 2 9 5 C 9 8 5 8 5 5 M 6 3 L 7 5 M 9 5 L 7 5 M 6 7 L 7 5 Z"
						stroke="black"
						strokeWidth={0.2}
						scaleX={5}
						fill="transparent"
						scaleY={5}
					/>
					{genSeats(remainingSeats, rows)}
				</Layer>
			</Stage>
		</div>
	);
}

export default memo(BusSeatsComponent);
