import React from "react";
import "../scss/TitleComponent.scss";
import arrowRight from "../img/arrow-right.svg";
import leftArrow from "../img/previous_arrow.svg";
import rightArrow from "../img/right_arrow.svg";
function TitleComponent({ source, destination, date }) {
	const newDate = new Date();
	const monthShortNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const formatDate = `${newDate.getDate()} ${
		monthShortNames[newDate.getMonth()]
	}`;
	const dayShortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const day = `${dayShortNames[newDate.getDay()]}`;

	return (
		<div className="title-container">
			<div className="location-container">{"source"}</div>
			<img className="arrow-icon" src={arrowRight} alt="to" />
			<div className="location-container">{"destination"}</div>
			<div className="date-container">
				<img className="arrow-icon btn" src={leftArrow} alt="go back" />
				<span className="date-content">
					{formatDate}
					<span className="day-container">{day}</span>
				</span>
				<img
					className="arrow-icon btn"
					src={rightArrow}
					alt="go forward"
				/>
			</div>
			<button>Modify</button>
		</div>
	);
}

export default TitleComponent;
