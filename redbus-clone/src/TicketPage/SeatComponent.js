import React, { useState } from "react";
import { Path } from "react-konva";
function SeatComponent({ x, y, onClick, disabled,rotation }) {
	const [selected, setSelected] = useState(false);
	const [strokeColor, setStrokeColor] = useState("red");
	const handleClick = () => {
		if (disabled) return;
		setSelected((prev) => {
			let tempColor = !prev ? "#07a31c" : "red";
			setStrokeColor(tempColor);
			return !prev;
		});
		onClick(!selected);
	};
	return (
		<Path
			x={x}
			y={y}
			data="m 20 20 h 25 v 25 h -25 v -5.5 h 20 v -15 h -20 v -5 m 0 2.5 h -10 v 20 h 10 v -2.5 h 20 v -15 h -20 z"
			fill={disabled ? "#9C9A9A" : "transparent"}
			stroke={disabled ? "#686565" : strokeColor}
			strokeWidth={1}
			onClick={handleClick}
			onTap={handleClick}
			rotation={rotation}
			onMouseEnter={(e) => {
				// style stage container:
				const container = e.target.getStage().container();
				container.style.cursor = disabled ? "not-allowed" : "pointer";
				// container.st
			}}
			onMouseLeave={(e) => {
				const container = e.target.getStage().container();
				container.style.cursor = "default";
			}}
		/>
	);
}

export default SeatComponent;
