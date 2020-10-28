import React, { useState, useContext } from "react";
import "../scss/HomePage.scss";
import InputComponent from "../components/InputComponent";
import doubleArrow from "../img/double-arrow.svg";
import OfferBannerComponent from "../components/OfferBannerComponent";
import offerImg1 from "../img/offer-img01.png";
import offerImg2 from "../img/offer-img02.png";
import safetyImg from "../img/safetyplus.svg";
import cityIcon from "../img/city-solid.svg";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
function HomePage() {
	const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");
	const { setQueryData } = useContext(DataContext);
	const [date] = useState(() => {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear();

		return dd + "/" + mm + "/" + yyyy;
	});

	const searchBuses = () => {
		setQueryData({ source, destination, date });
	};

	return (
		<>
			<HeaderComponent />
			<div className="homepage-container">
				<div className="img-container"></div>
				<div className="img-content">
					<div className="search-container">
						<InputComponent
							label="FROM"
							type="text"
							value={source}
							setValue={setSource}
							iconImg={cityIcon}
						/>
						<span className="arrow-container">
							<img src={doubleArrow} alt="interchange location" />
						</span>
						<InputComponent
							label="TO"
							type="text"
							value={destination}
							setValue={setDestination}
							iconImg={cityIcon}
						/>
						<InputComponent
							label="Date"
							type="text"
							value={date}
							setValue={setDestination}
							iconImg={cityIcon}
						/>
						<Link
							className="search-btn"
							to="/tickets"
							onClick={searchBuses}
						>
							Search Buses
						</Link>
					</div>
				</div>
				<div className="safety-banner">
					<img src={safetyImg} alt="be safe during covid19" />
					<div className="safety-content">
						<h1>Introducing Safety+ Program</h1>
						<p>
							A unique certification program to ensure safety in
							all buses.
						</p>
					</div>
					<div className="know-more-container">
						<button>KNOW MORE</button>
					</div>
				</div>
				<div className="main-container">
					<div className="offer-container">
						<OfferBannerComponent
							title="Save up to Rs 150 on bus tickets"
							image={offerImg1}
							subTitle="Use Code FIRST"
						/>
						<OfferBannerComponent
							title="Win Rs 10 to Rs 300 on minimum purchase of Rs 300"
							image={offerImg2}
							subTitle="Limited Period Offer"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default HomePage;
