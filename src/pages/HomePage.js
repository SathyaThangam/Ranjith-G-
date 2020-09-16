import axios from "axios";
import React, { Component } from "react";
import InputComponent from "../Components/InputComponent";
import InputDropdownComponent from "../Components/InputDropdownComponent";
import SearchResultComponent from "../Components/SearchResultComponent";

import "../css/Homepage.scss";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.resultRef = React.createRef();
		this.state = {
			startDate: new Date(),
			searchResults:""
		};
	}

	resultHandler = () => {
		const travelData = { source: "Chennai", destination: "Erode" };
		axios
			.post("/gettravels", travelData)
			.then((response) => {
				if (response.status === 200) {
					const data = response.data;
					console.log(data[0]);
				}
			})
			.catch((err) => {
				if (err.response.data === "Unavailable") {
					console.log("No data available");
				}
				else{
					console.error(err);
				}
			});
		this.resultRef.current.scrollIntoView({
			behavior: "smooth",
		});
	};

	handleChange = (date) => {
		this.setState({
			startDate: date,
		});
	};

	render() {
		return (
			<div>
				<div className="search-container">
					<div className="input-group">
						<InputDropdownComponent
							type="text"
							placeholder="From.. "
						/>
						<InputDropdownComponent
							type="text"
							placeholder="To.. "
						/>
						<InputComponent type="date" placeholder="" />
						<div className="search-btn-container">
							<button
								className="search-btn"
								onClick={this.resultHandler}
							>
								Search
								{/* <SearchIcon fontSize="small" className="icon" /> */}
							</button>
						</div>
					</div>
				</div>
				<div ref={this.resultRef} className="search-results-container">
					<h1>Search Results</h1>
					{this.state.searchResults}
					<SearchResultComponent
						agency="Deluxe travels"
						name="Deluxe travels BUS#5"
						seats="45"
						source="Chennai"
						destination="Pernampattu"
						price="426"
						departure="2020-09-16T10:05:19.844Z"
						arrival="2020-09-17T10:05:19.844Z"
					/>
				</div>
			</div>
		);
	}
}

export default HomePage;
