import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Cookie from "js-cookie";
import "../css/BookingPage.scss";
import TicketComponent from "../Components/TicketComponent";
// import
//TODO add loading bar
//TODO fix the bug on booking/
class BookingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			routeData: {},
			bookedSeats: [],
			tickets: [],
			ticketData: [],
			sourceTimeformat: "",
			sourceDateformat: "",
			destTimeformat: "",
			destDateformat: "",
		};
	}

	formatDate = (dateString) => {
		const date = new Date(dateString);
		var dd = String(date.getDate()).padStart(2, "0");
		var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = date.getFullYear();

		var resultdate = dd + "-" + mm + "-" + yyyy;

		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const day = days[date.getDay()];
		resultdate = `${day}, ${resultdate}`;
		return resultdate;
	};

	formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();

		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		const strTime = hours + ":" + minutes + " " + ampm;
		return strTime;
	}

	componentDidMount() {
		if (this.props.location.routeData === undefined) {
			//TODO get data
			const busID = this.props.match.params.id;
			var routeData = "";
			const sessionID = Cookie.get("sessionID");
			axios
				.post("/getbusdetails", { busid: busID, sessionID })
				.then((res) => {
					console.log("Props from server", res);
					routeData = res.data.travelData;
					this.setState({
						routeData: routeData,
						sourceTimeformat: this.formatAMPM(
							new Date(routeData.sourceTime)
						),
						sourceDateformat: this.formatDate(
							new Date(routeData.sourceTime)
						),
						destTimeformat: this.formatAMPM(
							new Date(routeData.destinationTime)
						),
						destDateformat: this.formatDate(
							new Date(routeData.destinationTime)
						),
					});
				});
		} else {
			console.log("Props", this.props.location.routeData);
			routeData = this.props.location.routeData;
			const sourceTimeformat= this.formatAMPM(new Date(routeData.departure));
			const sourceDateformat= this.formatDate(new Date(routeData.departure));
			const destTimeformat= this.formatAMPM(
				new Date(routeData.arrival)
			);
			const destDateformat= this.formatDate(
				new Date(routeData.arrival)
			);
			this.setState({
				routeData: routeData,
				sourceTimeformat:sourceTimeformat, 
				sourceDateformat:sourceDateformat, 
				destTimeformat:destTimeformat, 
				destDateformat:destDateformat, 
			});
			console.log(this.state);
		}
	}
	busSeatHandler = () => {
		const { routeData, bookedSeats } = this.state;
		const seats = [];

		var classList = "bus-seat";
		for (let i = 1; i <= routeData.seats; i++) {
			if (bookedSeats.includes(i.toString()))
				classList = "bus-seat active";
			else classList = "bus-seat";
			seats.push(
				<button
					className={classList}
					key={uuidv4()}
					value={i}
					onClick={(e) => this.seatHandler(e)}
				></button>
			);
		}
		return seats;
	};

	seatHandler = (event) => {
		const value = event.target.value;
		var seats = this.state.bookedSeats;
		if (seats.includes(value.toString()))
			seats = seats.filter((seat) => seat !== value.toString());
		else seats.push(value);
		var tickets = seats.map((item, i) => (
			<TicketComponent seatNumber={item} />
		));
		this.setState({ bookedSeats: seats, tickets: tickets });
		console.log(tickets);
	};

	render() {
		const { routeData } = this.state;
		return (
			<div className="booking-container">
				<div className="travel-details-container">
					<div className="heading">Review your booking</div>
					<div className="travel-details-content">
						<div className="pull-left">
							<h1>{routeData.name}</h1>
						</div>
						<div className="pull-right">
							<div className="travel-content-top">
								<div>
									<p className="city">{routeData.source}</p>
									<p className="time">
										{this.state.sourceTimeformat}
									</p>
									<p className="date">
										{this.state.sourceDateformat}
									</p>
								</div>
								<div className="content-center">
									{`Seats Available: ${routeData.seats}`}
								</div>
								<div>
									<p className="city">
										{routeData.destination}
									</p>
									<p className="time">
										{this.state.destTimeformat}
									</p>
									<p className="date">
										{this.state.destDateformat}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="travel-booking-container">
					<div className="seats-container">
						<div className="heading">Book your Seats</div>
						<div className="seats-content">
							{this.busSeatHandler()}
						</div>
					</div>
					<div className="ticket-container">
						<div className="heading">Ticket Details</div>
						<div className="ticket-content">
							<div className="ticket-contact">
								<div>
									<h3>Contact details</h3>
									<input
										type="text"
										placeholder="Email Id"
										onChange={(e) =>
											this.handleNameInput(e.target.value)
										}
									/>
									<input
										type="text"
										placeholder="Mobile Number"
										onChange={(e) =>
											this.handleGenderInput(
												e.target.value
											)
										}
									/>
								</div>
							</div>
							{this.state.tickets}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BookingPage;
