import React, { useState } from "react";
import "../../scss/MobileFilterComponent.scss";
import emptyRadio from "../../img/radio_btn_empty.svg";
import filledRadio from "../../img/radio_btn_filled.svg";
import MoreOptionsFragment from "./MoreOptionsFragment";
function MobileFilterComponent({ setShowFilter }) {
	const CHEAPEST_FIRST = "Cheapest First";
	const BEST_RATED_FIRST = "Best Rated First";
	const EARLY_DEPARTURE = "Early Departure";
	const LATE_DEPARTURE = "Late Departure";

	// const [radioValue, setRadioValue] = useState("");
	const [selectedRadio, setSelectedRadio] = useState("");

	const handleRadioChange = (value) => {
		// setRadioValue(value);
		setSelectedRadio(value);
	};

	const getSelected = (value) =>
		value === selectedRadio ? filledRadio : emptyRadio;

	return (
		<div className="mobile-filter-container">
			<div className="mobile-filter-header">
				<span className="close" onClick={() => setShowFilter(false)}>
					X
				</span>
				<div> Sort and Filter</div>
			</div>
			<div className="mobile-filter-segment sort-by-container">
				<div className="header">SORT BY</div>
				<div
					className="radio-container"
					onClick={() => handleRadioChange(CHEAPEST_FIRST)}
				>
					<img src={getSelected(CHEAPEST_FIRST)} alt="radio button" />
					{CHEAPEST_FIRST}
				</div>
				<div
					className="radio-container"
					onClick={() => handleRadioChange(BEST_RATED_FIRST)}
				>
					<img
						src={getSelected(BEST_RATED_FIRST)}
						alt="radio button"
					/>
					{BEST_RATED_FIRST}
				</div>
				<div
					className="radio-container"
					onClick={() => handleRadioChange(EARLY_DEPARTURE)}
				>
					<img
						src={getSelected(EARLY_DEPARTURE)}
						alt="radio button"
					/>
					{EARLY_DEPARTURE}
				</div>
				<div
					className="radio-container"
					onClick={() => handleRadioChange(LATE_DEPARTURE)}
				>
					<img src={getSelected(LATE_DEPARTURE)} alt="radio button" />
					{LATE_DEPARTURE}
				</div>
			</div>
			<div className="mobile-filter-segment">
				<div className="header">FILTER BY</div>
				<div className="mobile-filter-options-container">
					<span>Bus Departure Time From Source</span>
					<div className="filter-options">
						<div>06:00 to 12:00</div>
						<div>12:00 to 18:00</div>
						<div>18:00 to 24:00</div>
						<div>00:00 to 06:00</div>
					</div>
				</div>
			</div>
			<div className="mobile-filter-segment">
				<div className="mobile-filter-options-container">
					<span>Bus Type</span>
					<div className="filter-options">
						<div>AC</div>
						<div>NONAC</div>
						<div>SEATER</div>
						<div>SLEEPER</div>
					</div>
				</div>
			</div>
			<MoreOptionsFragment heading="Boarding Point" />
			<MoreOptionsFragment heading="Dropping Point" />
			<MoreOptionsFragment heading="Bus Operators" />
			<MoreOptionsFragment heading="Special Bus Features" newBadge />
			<MoreOptionsFragment heading="Bus Facilities" />
			<div className="mobile-filter-segment mobile-feature-options-container">
				<span>SPECIAL FEATURES</span>
				<div>
					<div className="feature-options">
						<span>Live Tracking</span>
						<input type="checkbox" />
					</div>
					<div className="feature-options">
						<span>Red Deals</span>
						<input type="checkbox" />
					</div>
					<div className="feature-options">
						<span>High Rated Buses</span>
						<input type="checkbox" />
					</div>
					<div className="feature-options">
						<span>Reschedulable</span>
						<input type="checkbox" />
					</div>
				</div>
			</div>
			<div className="mobile-filter-segment">
				<div className="mobile-filter-options-container">
					<span>Bus Arrival Time at Destination</span>
					<div className="filter-options">
						<div>06:00 to 12:00</div>
						<div>12:00 to 18:00</div>
						<div>18:00 to 24:00</div>
						<div>00:00 to 06:00</div>
					</div>
				</div>
			</div>
			<MoreOptionsFragment heading="RTC Bus Operator" />
		</div>
	);
}

export default MobileFilterComponent;
