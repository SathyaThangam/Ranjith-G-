import React, { useState } from "react";
import "../../scss/MobilePage.scss";
import rushHourCard from "../../img/rushhour_card.svg";
import safetyPlusCard from "../../img/safetyplus_card.svg";
import MobileTitleComponent from "./MobileTitleComponent";
import MobileBusComponent from "./MobileBusComponent";
import MobileFooterComponent from "./MobileFooterComponent";
import MobileOverlayComponent from "./MobileOverlayComponent";
import MobileFilterComponent from "./MobileFilterComponent";
import {getBusData} from "../../helpers/helper";
import MobileBusSeatsComponent from "./MobileBusSeatsComponent";

function MobilePage() {
	const [showFilter, setShowFilter] = useState(false);
	const [showSeats, setShowSeats] = useState(false);
	const [noOfSeats, setNoOfSeats] = useState(0);
	const [data] = useState(() => {
		const source = localStorage.getItem("source");
		const destination = localStorage.getItem("destination");
		if (source !== null && destination !== null)
			return getBusData(source, destination);
		return [];
	});

	if(showSeats)
		{
			return (
				<MobileOverlayComponent>
					<MobileBusSeatsComponent setShowSeats={setShowSeats}  noOfSeats={noOfSeats}/>
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
			<MobileTitleComponent />
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
									setNoOfSeats={setNoOfSeats}
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
