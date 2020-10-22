import React, { Component, Suspense, lazy } from "react";
import CircularLoaderComponent from "../Components/CircularLoaderComponent";
import DateComponent from "../Components/DateComponent";
import InputDropdownComponent from "../Components/InputDropdownComponent";
import SearchResultComponent from "../Components/SearchResultComponent";
import AlertComponent from "../Components/AlertComponent";
import Modal from "@material-ui/core/Modal";
import "../css/Homepage.scss";
import "/data_unavailable.svg";
import { getRequest } from "../helpers/request-helper";
// import AuthenticateModalComponent from "../Components/AuthenticateModalComponent";
const AuthenticateModalComponent = lazy(() =>
	import("../Components/AuthenticateModalComponent")
);
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
			emptySource: false,
			emptyDestination: false,
		};
	}

	// state Controllers
	setSource = (value) => {
		this.setState({ source: value, emptySource: false });
	};

	setDestination = (value) => {
		this.setState({ destination: value, emptyDestination: false });
	};

	setTravelDate = (value) => {
		this.setState({ travelDate: value });
	};

	modalClose = () => {
		this.setState({ modalOpen: false });
	};

	resultHandler = () => {
		const { source, destination } = this.state;

		if (source !== "" && destination !== "") {
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
		} else {
			this.setState({
				emptySource: source === "",
				emptyDestination: destination === "",
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
								error={this.state.emptySource}
							/>
							<InputDropdownComponent
								type="text"
								placeholder="To.. "
								handleInput={this.setDestination}
								error={this.state.emptyDestination}
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
					<Suspense fallback={<CircularLoaderComponent />}>
						<AuthenticateModalComponent
							handleModalClose={this.modalClose}
							handleSession={this.props.handleSession}
						/>
					</Suspense>
				</Modal>
				{this.state.emptyDestination ? (
					<AlertComponent>Please select a destination</AlertComponent>
				) : (
					""
				)}
				{this.state.emptySource ? (
					<AlertComponent>Please select a source</AlertComponent>
				) : (
					""
				)}
			</div>
		);
	}
}

export default HomePage;
