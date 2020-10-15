import React, { Component } from "react";
import AuthenticateModalComponent from "../Components/AuthenticateModalComponent";
import DateComponent from "../Components/DateComponent";
import InputDropdownComponent from "../Components/InputDropdownComponent";
import SearchResultComponent from "../Components/SearchResultComponent";
import Modal from "@material-ui/core/Modal";
import "../css/Homepage.scss";
import "/data_unavailable.svg";
import { getRequest } from "../helpers/request-helper";
class HomePage extends Component {
	constructor(props) {
		super(props);
		//Reference for search results
		this.resultRef = React.createRef();
		this.state = {
			searchResults: <tr></tr>,
			source: "",
			destination: "",
			travelDate: new Date(),
			modalOpen: false,
		};
	}

	// state Controllers
	setSource = (value) => {
		this.setState({ source: value });
	};

	setDestination = (value) => {
		this.setState({ destination: value });
	};

	setTravelDate = (value) => {
		this.setState({ travelDate: value });
	};

	modalClose = () => {
		this.setState({ modalOpen: false });
	};

	resultHandler = () => {
		const { source, destination } = this.state;
		
		if(source !== "" && destination !== ""){
			const travelData = { source, destination };

			// Fetch the bus data
			getRequest("/data/gettravels", travelData)
				.then((response) => {
					if (response.status === 200) {
						const data = response.data;
						if (data && data.length !== 0) {
							const searchResults = data.map((bus) => (
								<SearchResultComponent
									key={bus.id}
									id={bus.id}
									agency={bus.agency}
									name={bus.name}
									seats={bus.seats}
									source={bus.source}
									destination={bus.destination}
									ticketprice={bus.ticketprice}
									departure={bus.sourceTime}
									arrival={bus.destinationTime}
								/>
							));
							this.setState({ searchResults });
						}
					}
				})
				.catch((error) => {
					console.log(error);
					console.log("hello",error.response,error.response.status);
					if (error.response) {
						var searchResults = <h1>Error</h1>;
						if (error.response.status === 404) {
							searchResults = (
								<img
									src="data_unavailable.svg"
									alt="data unavailable"
								/>
							);
						}
						this.setState({ searchResults });
					}
				});
			//scroll to results
			this.resultRef.current.scrollIntoView({
				behavior: "smooth",
			});
		}
	};

	render() {
		return (
			<div>
				<div className="home-container">
					<div className="home-content-left">
						Book your bus from the comfort of your Home..
					</div>
					<div className="home-content-right">
						<div className="input-group">
							<div className="input-group-heading">
								Search Available Buses
							</div>
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
							<DateComponent
								date={this.state.travelDate}
								handleInput={this.setTravelDate}
							/>
							<div className="search-btn-container">
								<button
									className="search-btn"
									onClick={this.resultHandler}
								>
									Search
								</button>
							</div>
						</div>
					</div>
				</div>
				<div ref={this.resultRef} className="search-results-container">
					<h1 className="heading">Search Results</h1>
					<table className="search-table">
						<thead>
							<tr className="search-result-title">
								<td>Agency</td>
								<td>Source</td>
								<td>Departure</td>
								<td>Destination</td>
								<td>Arrival</td>
								<td>Seats</td>
								<td>Price</td>
								<td>Get seats</td>
							</tr>
						</thead>
						<tbody>{this.state.searchResults}</tbody>
					</table>
				</div>
				<Modal open={this.state.modalOpen} onClose={this.modalClose}>
					<AuthenticateModalComponent
						handleModalClose={this.modalClose}
						handleSession={this.props.handleSession}
					/>
				</Modal>
			</div>
		);
	}
}

export default HomePage;
