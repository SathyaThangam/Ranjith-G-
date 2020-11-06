import React, { useState } from "react";
import "../../scss/MobileFooterComponent.scss";
function MobileFooterComponent({setShowFilter}) {
	const [selectedAC, setSelectedAC] = useState(false);
	const [selectedNonAC, setSelectedNonAC] = useState(false);
	const [selectedSleeper, setSelectedSleeper] = useState(false);
	const [selectedTime, setSelectedTime] = useState(false);

	//TODO run performance check for onclick
	return (
		<div className="mobile-filter-footer">
			<div
				className={`filter-options ${selectedAC ? "highlighted" : ""}`}
				onClick={() => setSelectedAC((prev) => !prev)}
			>
				<span className="filter-option-img"></span>
				<span className="filter-option-title">AC</span>
			</div>
			<div
				className={`filter-options ${
					selectedNonAC ? "highlighted" : ""
				}`}
				onClick={() => setSelectedNonAC((prev) => !prev)}
			>
				<span className="filter-option-img"></span>
				<span className="filter-option-title">Non AC</span>
			</div>
			<div
				className={`filter-options ${
					selectedSleeper ? "highlighted" : ""
				}`}
				onClick={() => setSelectedSleeper((prev) => !prev)}
			>
				<span className="filter-option-img"></span>
				<span className="filter-option-title">Sleeper</span>
			</div>
			<div
				className={`filter-options ${
					selectedTime ? "highlighted" : ""
				}`}
				onClick={() => setSelectedTime((prev) => !prev)}
			>
				<span className="filter-option-img"></span>
				<span className="filter-option-title">18:00 - 24:00</span>
			</div>
			<button className="filter-option-btn cur-pointer" onClick={() => setShowFilter(true)}>
				SORT& FILTER
			</button>
		</div>
	);
}

export default MobileFooterComponent;
