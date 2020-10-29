import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import TitleComponent from "./TitleComponent";
import FilterComponent from "./FilterComponent";
import rushHourCard from "../img/rushhour_card.svg";
import safetyPlusCard from "../img/safetyplus_card.svg";
import "../scss/TicketPage.scss";
import BusComponent from "./BusComponent";
function DesktopPage() {
	const { queryData } = useContext(DataContext);
	const [showFilter, setShowFilter] = useState(false);
	return (
		<div>
			<TitleComponent
				source={queryData.source}
				destination={queryData.destination}
				date={queryData.date}
			/>
			<div className="ticket-container">
				<FilterComponent show={showFilter} />
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
					<div
						className="set-filters"
						onClick={() => setShowFilter((prev) => !prev)}
					>
						<span>FILTERS</span>
					</div>
					<div className="announcement">
						All bus ratings include safety as a major factor
					</div>
					<div className="divider"></div>
					<div className="results-title-container">
						<div className="result-title-heading">
							<div>
								<span className="f-bold">99 BUSES</span>
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
						Showing <span className="f-bold">6 Buses </span>
						from <span className="f-bold">Source </span>
						to <span className="f-bold">destination</span>
					</div>
					<div className="search-result">
						<BusComponent />
						<BusComponent />
					</div>
				</div>
			</div>
		</div>
	);
}

export default DesktopPage;
