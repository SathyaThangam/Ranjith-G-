import React from "react";
import "../scss/TitleComponent.scss";
import arrowRight from "../img/arrow-right.svg";
import leftArrow from "../img/previous_arrow.svg";
import rightArrow from "../img/right_arrow.svg";
import { formatDate, formatDay } from "../helpers/helper";
function TitleComponent({ source, destination, date }) {
	return (
		<div className="title-container">
			<div>
				{source !== "" && source !== undefined ? source : "source"}
			</div>
			<img className="arrow-icon" src={arrowRight} alt="to" />
			<div>
				{destination !== "" && destination === undefined
					? destination
					: "destination"}
			</div>
			<div className="date-container">
				<img className="arrow-icon btn" src={leftArrow} alt="go back" />
				<span className="date-content">
					{date !== "" && date !== undefined
						? formatDate(date)
						: formatDate(new Date())}
					<span className="day-container">
						{date !== "" && date !== undefined
							? formatDay(date)
							: formatDay(new Date())}
					</span>
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
