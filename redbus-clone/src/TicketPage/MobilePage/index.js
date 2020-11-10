import React, { useState } from "react";
import "../../scss/MobilePage.scss";
import rushHourCard from "../../img/rushhour_card.svg";
import safetyPlusCard from "../../img/safetyplus_card.svg";
import MobileTitleComponent from "./MobileTitleComponent";
import MobileBusComponent from "./MobileBusComponent";
import MobileFooterComponent from "./MobileFooterComponent";
import MobileOverlayComponent from "./MobileOverlayComponent";
import MobileFilterComponent from "./MobileFilterComponent";
import { getBusData, formatDate, changeDate } from "../../helpers/helper";
import MobileBusSeatsComponent from "./MobileBusSeatsComponent";
import leftArrow from "../../img/left_arrow.svg";
import rightArrow from "../../img/right_arrow.svg";
import arrowRight from "../../img/arrow-right.svg";
import { Link } from "react-router-dom";

function MobilePage() {
	const [showFilter, setShowFilter] = useState(false);
	const [showSeats, setShowSeats] = useState(false);
	const [selectedBus, setSelectedBus] = useState({});
	const source = localStorage.getItem("source");
	const destination = localStorage.getItem("destination");
	const [date, setDate] = useState(() =>
		localStorage.getItem("date")
			? new Date(localStorage.getItem("date").valueOf())
			: new Date()
	);
	const [data] = useState(() => {
		if (source !== null && destination !== null)
			return getBusData(source, destination);
		return [];
	});

	if (showSeats) {
		return (
			<MobileOverlayComponent>
				<MobileBusSeatsComponent
					setShowSeats={setShowSeats}
					busData={selectedBus}
				/>
			</MobileOverlayComponent>
		);
	}

	if (showFilter)
		return (
			<MobileOverlayComponent>
				<MobileFilterComponent setShowFilter={setShowFilter} />
			</MobileOverlayComponent>
		);

	return (
		<div>
			<MobileTitleComponent>
				<span className="back-btn">
					<Link className=".link-style-reset" to="/">
						<img
							className="arrow-icon btn"
							src={arrowRight}
							alt="back"
						/>
					</Link>
				</span>
				<div className="title-content">{`${source} to ${destination}`}</div>
				<div className="mobile-date-container">
					<img
						className="arrow-icon btn"
						src={leftArrow}
						alt="go back"
						onClick={() => setDate(prev => changeDate(prev,-1))}
					/>
					<span className="date-content">{formatDate(date)}</span>
					<img
						className="arrow-icon btn"
						src={rightArrow}
						alt="go forward"
						onClick={() => setDate(prev => changeDate(prev,1))}
					/>
				</div>
			</MobileTitleComponent>
			<div className="mobile-main-content">
				<div className="offers-container">
					<div className="offer-card">
						<img src={rushHourCard} alt="Get rush hour offers" />
					</div>
					<div className="offer-card">
						<img src={safetyPlusCard} alt="get safety offers" />
					</div>
				</div>
				<div className="announcement">{data.length} Buses found</div>
				<div className="mobile-results-container">
					{data.length !== 0
						? data.map((bus) => (
								<MobileBusComponent
									key={bus["id"]}
									busData={bus}
									setSelectedBus={setSelectedBus}
									setShowSeats={setShowSeats}
								/>
						  ))
						: "No Buses Found"}
				</div>
			</div>
			<MobileFooterComponent setShowFilter={setShowFilter} />
		</div>
	);
}

export default MobilePage;
