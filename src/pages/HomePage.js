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
			searchResults: "",
			source: "",
			destination: "",
			travelDate: "",
		};
	}

	setSource = (value) => {
		this.setState({ source: value });
	};

	setDestination = (value) => {
		this.setState({ destination: value });
	};

	setTravelDate = (value) => {
		this.setState({ travelDate: value });
	};

	resultHandler = () => {
		const { source, destination } = this.state;
		const travelData = { source, destination };
		console.log(travelData);
		const formatDate = (dateString) => {
			const date = new Date(dateString);
			var dd = String(date.getDate()).padStart(2, "0");
			var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
			var yyyy = date.getFullYear();

			const resultdate = mm + "-" + dd + "-" + yyyy;
			return resultdate;
		};
		// console.log(this.state.source, this.state.destination);
		axios
			.post("http://localhost:8080/gettravels", travelData)
			.then((response) => {
				if (response.status === 200) {
					const data = response.data;
					console.log(data[0]);
					if (data !== null && data.length !== 0) {
						const searchResults = data.map((bus) => (
							<SearchResultComponent
								key={bus.id}
								agency={bus.agency}
								name={bus.name}
								seats={bus.seats}
								source={bus.source}
								destination={bus.destination}
								price={bus.ticketprice}
								departure={formatDate(bus.sourceTime)}
								arrival={formatDate(bus.destinationTime)}
							/>
						));
						this.setState({ searchResults });
					}
				}
			})
			.catch((err) => {
				console.log(err);
				// if (err.response.data === "Unavailable") {
				// 	console.log("No data available");
				// } else {
				// 	console.error(err);
				// }
			});
		// axios
		// 	.get("http://localhost:8080/ping")
		// 	.then((res) => console.log(res))
		// 	.catch((err) => console.log(err));
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
							handleInput={this.setSource}
						/>
						<InputDropdownComponent
							type="text"
							placeholder="To.. "
							handleInput={this.setDestination}
						/>
						<InputComponent
							type="date"
							placeholder=""
							// value can be accessed using onchange
						/>
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
					<div className="search-result-title">
						<p>{"agency"}</p>
						<p>{"name"}</p>
						<p>{"seats"}</p>
						<p>{"source"}</p>
						<p>{"destination"}</p>
						<p>{"price"}</p>
						<p>{"departure"}</p>
						<p>{"arrival"}</p>
						<p>{"Get seats"}</p>
					</div>
					{this.state.searchResults}
				</div>
			</div>
		);
	}
}

export default HomePage;
