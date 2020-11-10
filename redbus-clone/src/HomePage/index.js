import React, { useState, useEffect, useCallback } from "react";
import "../scss/HomePage.scss";
import InputComponent from "../components/InputComponent";
import doubleArrow from "../img/double-arrow.svg";
import OfferBannerComponent from "../components/OfferBannerComponent";
import offerImg1 from "../img/offer-img01.png";
import offerImg2 from "../img/offer-img02.png";
import safetyImg from "../img/safetyplus.svg";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import DropDownComponent from "../components/DropDownComponent";
import cities from "../data/cities-name-list.json";
import uid from "uid";
import DateComponent from "./DateComponent";
function HomePage() {
	const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");
	const [date, setDate] = useState(new Date());

	const [sourceDropdown, setSourceDropdown] = useState([]);
	const [destinationDropDown, setDestinationDropDown] = useState([]);
	const [cityData] = useState(() => {
		return cities.map((city) => ({
			key: uid(),
			name: city,
		}));
	});

	const searchCities = async (searchString, cities) =>
		await cities.filter((city) =>
			city["name"].toLowerCase().includes(searchString.toLowerCase())
		);

	const setDropDown = useCallback(async (state, setFn, cityData) => {
		if (!isEmpty(state)) {
			const data = await searchCities(state, cityData);
			if (data.length === 1 && data[0].name === state) setFn([]);
			else setFn(data);
		} else setFn([]);
	}, []);

	const swapSourceAndDestination = () => {
		const tempSource = source;
		setSource(destination);
		setDestination(tempSource);
	};

	useEffect(() => {
		setDropDown(source, setSourceDropdown, cityData);
	}, [source, setDropDown, cityData]);

	useEffect(() => {
		setDropDown(destination, setDestinationDropDown, cityData);
	}, [destination, setDropDown, cityData]);

	useEffect(() => {
		const tempSource = localStorage.getItem("source");
		const tempDestination = localStorage.getItem("destination");
		const tempDate = localStorage.getItem("date");
		if (tempSource !== null) setSource(tempSource);
		if (tempDestination !== null) setDestination(tempDestination);
		if (tempDate !== null && tempDate < new Date()) setDate(tempDate);
	}, []);

	const isEmpty = (variable) => variable === "";

	const searchBuses = (e) => {
		if (!isEmpty(source) && !isEmpty(destination) && !isEmpty(date)) {
			localStorage.setItem("source", source);
			localStorage.setItem("destination", destination);
			localStorage.setItem("date", date);
		} else {
			e.preventDefault();
		}
	};

	return (
		<>
			<HeaderComponent />
			<div className="homepage-container">
				<div className="img-container"></div>
				<div className="img-content">
					<div className="search-container">
						<div>
							<InputComponent
								label="FROM"
								type="text"
								value={source}
								setValue={setSource}
							/>
							<DropDownComponent
								list={sourceDropdown}
								setValue={setSource}
							/>
						</div>
						<span className="arrow-container">
							<img
								src={doubleArrow}
								onClick={() => swapSourceAndDestination()}
								alt="interchange location"
							/>
						</span>
						<div>
							<InputComponent
								style={{backgroundColor:"#000"}}
								label="TO"
								type="text"
								value={destination}
								addSpace
								setValue={setDestination}
							/>
							<DropDownComponent
								list={destinationDropDown}
								setValue={setDestination}
							/>
						</div>
						<div>
							<DateComponent
								label="DATE"
								type="text"
								setValue={setDate}
							/>
						</div>
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
