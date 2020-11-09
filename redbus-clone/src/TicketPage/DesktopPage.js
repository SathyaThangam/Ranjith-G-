import React, { useState } from "react";
import TitleComponent from "./TitleComponent";
import FilterComponent from "./FilterComponent";
import rushHourCard from "../img/rushhour_card.svg";
import safetyPlusCard from "../img/safetyplus_card.svg";
import "../scss/TicketPage.scss";
import BusComponent from "./BusComponent";
import { getBusData } from "../helpers/helper";
function DesktopPage() {
	const source = localStorage.getItem("source");
	const destination = localStorage.getItem("destination");
	const [data] = useState(() => {
		const source = localStorage.getItem("source");
		const destination = localStorage.getItem("destination");
		if (source !== null && destination !== null)
			return getBusData(source, destination);
		return [];
	});
	return (
		<div>
			<TitleComponent />
			<div className="ticket-container">
				<FilterComponent />
				<div className="main-content">
					<div className="offers-container">
						<div className="offer-card">
							<img
								src={rushHourCard}
								alt="Get rush hour offers"
							/>
						</div>
						<div className="offer-card">
							<img src={safetyPlusCard} alt="get safety offers" />
						</div>
					</div>
					<div className="announcement">
						All bus ratings include safety as a major factor
					</div>
					<div className="divider"></div>
					<div className="results-title-container">
						<div className="result-title-heading">
							<div>
								<span className="f-bold">
									{data.length} BUSES
								</span>
								<span> </span>
								<span>found</span>
							</div>
							<div className="f-bold">SORT BY</div>
						</div>
						<div className="sort-titles">
							<span>Departure</span>
							<span>Duration</span>
							<span>Arrival</span>
							<span>Ratings</span>
							<span>Fare</span>
							<span>Seats Available</span>
						</div>
					</div>
					<div className="search-result-heading">
						Showing{" "}
						<span className="f-bold">{data.length} Buses </span>
						from <span className="f-bold">{source} </span>
						to <span className="f-bold">{destination}</span>
					</div>
					<div className="search-result">
						{data &&
							data.length &&
							data.map((bus) => <BusComponent data={bus} />)
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DesktopPage;
