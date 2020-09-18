import axios from "axios";
import React, { Component } from "react";
import AuthenticateModalComponent from "../Components/AuthenticateModalComponent";
import InputComponent from "../Components/InputComponent";
import InputDropdownComponent from "../Components/InputDropdownComponent";
import SearchResultComponent from "../Components/SearchResultComponent";
import Modal from "@material-ui/core/Modal";
import "../css/Homepage.scss";
import "/data_unavailable.svg";
import Cookie from "js-cookie"
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
			search: null,
			modalOpen: false,
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

	modalClose = () => {
		this.setState({ modalOpen: false });
	};

	resultHandler = () => {
		//TODO remove login for accessing this button
		const { source, destination } = this.state;
		const sessionID = Cookie.get("sessionID");
		const travelData = { source, destination,sessionID };
		const formatDate = (dateString) => {
			const date = new Date(dateString);
			var dd = String(date.getDate()).padStart(2, "0");
			var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
			var yyyy = date.getFullYear();

			const resultdate = dd + "-" + mm + "-" + yyyy;
			return resultdate;
		};
		// console.log(this.state.source, this.state.destination);
		axios
			.post("/gettravels", travelData)
			.then((response) => {
				if (response.status === 200) {
					const data = response.data;
					if (data !== null && data.length !== 0) {
						const searchResults = data.map((bus) => (
							<SearchResultComponent
								key={bus.id}
								id={bus.id}
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
						this.setState({ searchResults, search: true });
					}
				}
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					// console.log(error.response.data);
					// console.log(error.response.status);
					// console.log(error.response.headers);
					var searchResults = <h1>Error</h1>;
					var search = true;
					if (error.response.status === 404) {
						searchResults = (
							<img
								src="data_unavailable.svg"
								alt="data unavailable"
							/>
						);
					}
					this.setState({ searchResults, search });
				}
			});
		// axios
		// 	.get("http://localhost:8080/ping")
		// 	.then((res) => console.log(res))
		// 	.catch((err) => console.log(err));
		if (this.state.search) {
			this.resultRef.current.scrollIntoView({
				behavior: "smooth",
			});
		}
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
					<table className="search-table">
						<thead>
							<tr className="search-result-title">
								<td>{"Agency"}</td>
								<td>{"Source"}</td>
								<td>{"Departure"}</td>
								<td>{"Destination"}</td>
								<td>{"Arrival"}</td>
								<td>{"Seats"}</td>
								<td>{"Price"}</td>
								<td>{"Get seats"}</td>
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
