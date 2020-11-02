import React, { useState } from "react";
import leftArrow from "../../img/left_arrow.svg";
import rightArrow from "../../img/right_arrow.svg";
import arrowRight from "../../img/arrow-right.svg";
import "../../scss/MobileTitleComponent.scss";
import { formatDate } from "../../helpers/helper";
import { Link } from "react-router-dom";
function MobileTitleComponent() {
	const linkStyle = {
		textDecoration: "none",
	};

	const [date, setDate] = useState(() => {
		return new Date(localStorage.getItem("date"));
	});

	const formatPlaces = (place) => {
		if (place.length > 10) return place.slice(0, 10).trim().concat('..');
		return place;
	};

	const source = formatPlaces(localStorage.getItem("source"));
	const destination = formatPlaces(localStorage.getItem("destination"));

	const changeDate = (difference) => {
		setDate((prev) => {
			const newDate = new Date(prev.valueOf());
			newDate.setDate(newDate.getDate() + difference);
			return newDate;
		});
	};

	return (
		<div className="mobile-title-container">
			<span className="back-btn">
				<Link style={linkStyle} to="/">
					<img
						className="arrow-icon btn"
						src={arrowRight}
						alt="back"
					/>
				</Link>
			</span>
			<div className="title-content">
				{source} to {destination}
			</div>
			<div className="mobile-date-container">
				<img
					className="arrow-icon btn"
					src={leftArrow}
					alt="go back"
					onClick={() => changeDate(-1)}
				/>
				<span className="date-content">{formatDate(date)}</span>
				<img
					className="arrow-icon btn"
					src={rightArrow}
					alt="go forward"
					onClick={() => changeDate(1)}
				/>
			</div>
		</div>
	);
}

export default MobileTitleComponent;
