import React, { useState } from "react";
import "../scss/TitleComponent.scss";
import arrowRight from "../img/arrow-right.svg";
import leftArrow from "../img/previous_arrow.svg";
import rightArrow from "../img/right_arrow.svg";
import closeIcon from "../img/close-icon.svg";
import { formatDate, formatDay } from "../helpers/helper";
import InputComponent from "../components/InputComponent";
function TitleComponent() {
	const [modifyTitle, setModifyTitle] = useState(false);
	const [source,setSource] = useState(() => {
		if (localStorage.getItem("source") !== null)
			return localStorage.getItem("source");
		return "source";
	});
	const [destination,setDestination] = useState(() => {
		if (localStorage.getItem("destination") !== null)
			return localStorage.getItem("destination");
		return "destination";
	});
	const [date, setDate] = useState(() => {
		return new Date(localStorage.getItem("date"));
	});

	const changeDate = (difference) => {
		setDate((prev) => {
			const newDate = new Date(prev.valueOf());
			newDate.setDate(newDate.getDate() + difference);
			return newDate;
		});
	};

	if (modifyTitle) return (
		<div className="title-container">
			<InputComponent label="FROM" value={source} setValue={setSource} />
			<InputComponent label="TO" value={destination} setValue={setDestination} />
			<button className="search-btn">SEARCH</button>
			<div className="close" onClick={() => setModifyTitle(false)}>
				<img src={closeIcon} className="close-icon" alt="close"/>
			</div>
		</div>
	);

	return (
		<div className="title-container">
			<div>{source}</div>
			<img className="arrow-icon" src={arrowRight} alt="to" />
			<div>{destination}</div>
			<div className="date-container">
				<img
					className="arrow-icon btn"
					src={leftArrow}
					alt="go back"
					onClick={() => changeDate(-1)}
				/>
				<span className="date-content">
					{formatDate(date)}
					<span className="day-container">{formatDay(date)}</span>
				</span>
				<img
					className="arrow-icon btn"
					src={rightArrow}
					alt="go forward"
					onClick={() => changeDate(1)}
				/>
			</div>
			<button onClick={() => setModifyTitle(true)}>Modify</button>
		</div>
	);

}

export default TitleComponent;
