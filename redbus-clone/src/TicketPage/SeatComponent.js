import React, { useState } from "react";
import { Path } from "react-konva";
function SeatComponent({ x, y, onClick, position, disabled, rotation,isSelected }) {
	const [selected, setSelected] = useState(isSelected);
	const [strokeColor, setStrokeColor] = useState("red");
	const [fillColor, setFillColor] = useState("transparent");
	const handleClick = () => {
		if (disabled) return;
		setStrokeColor(!selected ? "#07a31c" : "red");
		setFillColor(!selected ? "#95e09f" : "transparent");
		setSelected((prev) => !prev);
		onClick(position);
	};
	return (
		<Path
			x={x}
			y={y}
			data="m 20 20 h 25 v 25 h -25 v -5.5 h 20 v -15 h -20 v -5 m 0 2.5 h -10 v 20 h 10 v -2.5 h 20 v -15 h -20 z"
			fill={disabled ? "#9C9A9A" : fillColor}
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
