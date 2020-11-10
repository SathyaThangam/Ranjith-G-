import React, { useState, useEffect, useMemo } from "react";
import "../../scss/MobileBoardingPointsComponent.scss";
import uid from "uid";
import emptyRadio from "../../img/radio_btn_empty.svg";
import filledRadio from "../../img/radio_btn_filled.svg";
function MobileBoardingPointsComponent({
	data,
	heading,
	boardingPoint,
	setBoardingPoint,
}) {
	const initialData = useMemo(() => {
		return data.map((item) => (
			<div
				key={uid()}
				className="mb-boarding-pt"
				onClick={() => setBoardingPoint(item)}
			>
				<img
					src={boardingPoint === item ? filledRadio : emptyRadio}
					alt="click to select"
				/>
				{item}
			</div>
		));
	}, [data, boardingPoint, setBoardingPoint]);
	const [items, setItems] = useState(initialData);

	useEffect(() => {
		if (boardingPoint !== "")
			setItems([
				<div key={uid()} className="mb-boarding-pt">
					<img src={filledRadio} alt="selected" />
					{boardingPoint}
				</div>,
			]);
	}, [boardingPoint]);

	return (
		<div className="mb-boarding-pt-container">
			<div className="mb-boarding-pt-heading">
				<span>{heading}</span>
				{boardingPoint !== "" ? (
					<button
						className="mb-change-btn"
						onClick={() => setItems(initialData)}
					>
						Change
					</button>
				) : (
					""
				)}
			</div>
			{items}
		</div>
	);
}

export default MobileBoardingPointsComponent;
