import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Cookie from "js-cookie";
import "../css/BookingPage.scss";
import TicketComponent from "../Components/TicketComponent";
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
			contactEmail: "",
			contactPhoneNo: "",
			totalprice:0
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
			const sourceTimeformat = this.formatAMPM(
				new Date(routeData.departure)
			);
			const sourceDateformat = this.formatDate(
				new Date(routeData.departure)
			);
			const destTimeformat = this.formatAMPM(new Date(routeData.arrival));
			const destDateformat = this.formatDate(new Date(routeData.arrival));
			this.setState({
				routeData: routeData,
				sourceTimeformat: sourceTimeformat,
				sourceDateformat: sourceDateformat,
				destTimeformat: destTimeformat,
				destDateformat: destDateformat,
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
		var ticketPrice = this.state.routeData.ticketprice;
		if (seats.includes(value.toString()))
			seats = seats.filter((seat) => seat !== value.toString());
		else seats.push(value);
		var totalprice = ticketPrice * seats.length;
		var tickets = seats.map((item, i) => (
			<TicketComponent
				key={uuidv4()}
				seatNumber={item}
				handleTicket={this.ticketHandler}
				value={i}
			/>
		));
		this.setState({ bookedSeats: seats, tickets: tickets,totalprice });
	};

	ticketHandler = (value, i) => {
		const ticketData = [...this.state.ticketData];
		ticketData[i] = value;
		this.setState({ ticketData });
	};

	isEmpty = (value) => {
		if (value === "" || value === undefined || value === null) return true;
		else return false;
	};

	paymentHandler = async (bookingDetails) => {
		const {routeData} = this.state;
		console.log(routeData.price);
		const API_URL = "/razorpay/";
		const sessionID = Cookie.get("sessionID");
		const itemData = {
			bookingDetails,
			totalprice: this.state.totalprice,
			sessionID
		};
		console.log("Payment handler");
		const orderUrl = `${API_URL}order`;
		const response = await axios.post(orderUrl, itemData);
		const { data } = response;
		console.log("response",response);
		const options = {
			key: process.env.RAZORPAY_API_KEY,
			name: "getBus",
			description: "Tickets",
			order_id: data.id,
			handler: (response) => {
				try {
					const paymentId = response.razorpay_payment_id;
					const url = `${API_URL}capture/${paymentId}`;
					axios
						.post(url, itemData)
						.then((res) => {
							const data = JSON.parse(res.data);
							console.log(data.status);
							if (data.status === "captured") {
								//TODO add success route
							}
						})
						.catch((err) => console.log(err));
					// console.log(captureResponse);
				} catch (err) {
					console.log(err);
				}
			},
			theme: {
				color: "#6cfc6a",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	bookingHandler = () => {
		var bookingDetails = {};
		const { contactEmail, contactPhoneNo } = this.state;
		const ticketData = [...this.state.ticketData];
		if (
			!this.isEmpty(contactEmail) &&
			!this.isEmpty(contactPhoneNo) &&
			ticketData.length !== 0
		) {
			bookingDetails = { contactEmail, contactPhoneNo, ticketData };
			this.paymentHandler(bookingDetails);
			console.log(bookingDetails);
			console.log("ticketData", this.state.ticketData);
		} else {
			console.log("check again");
		}
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
									<br />
									{`Price Rs. ${routeData.ticketprice}`}
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
						<div className="heading">
							Ticket Details
							<button
								disabled={this.state.tickets.length === 0}
								onClick={this.bookingHandler}
							>
								{`Book now Rs.${this.state.totalprice}`}
							</button>
						</div>
						<div className="ticket-content">
							<div className="ticket-contact">
								<div>
									<h3>Contact details</h3>
									<input
										type="text"
										placeholder="Email Id"
										onChange={(e) =>
											this.setState({
												contactEmail: e.target.value,
											})
										}
									/>
									<input
										type="text"
										placeholder="Mobile Number"
										onChange={(e) =>
											this.setState({
												contactPhoneNo: e.target.value,
											})
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
