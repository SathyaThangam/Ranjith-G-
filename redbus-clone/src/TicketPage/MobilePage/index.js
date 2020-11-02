import React from "react";
import "../../scss/MobilePage.scss";
import rushHourCard from "../../img/rushhour_card.svg";
import safetyPlusCard from "../../img/safetyplus_card.svg";
import MobileTitleComponent from "./MobileTitleComponent";
import MobileBusComponent from "./MobileBusComponent";
import MobileFilterComponent from "./MobileFooterComponent";

function MobilePage() {
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
				<div className="announcement">431 Buses found</div>
				<div className="mobile-results-container">
					<MobileBusComponent />
					<MobileBusComponent />
					<MobileBusComponent />
					<MobileBusComponent />
					<MobileBusComponent />
				</div>
			</div>
			<MobileFilterComponent/>
		</div>
	);
}

export default MobilePage;
