import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Cookie from "js-cookie";
import "../css/BookingPage.scss";
// import
//TODO add loading bar
//TODO fix the bug on booking/
class BookingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			routeData: {},
		};
	}

	componentDidMount() {
		console.log("id", this.props.match.params.id);
		if (this.props.location.routeData === undefined) {
			//TODO get data
			const busID = this.props.match.params.id;
			const sessionID = Cookie.get("sessionID");
			axios
				.post("/getbusdetails", { busid: busID, sessionID })
				.then((res) => {
					console.log("Props from server", res);
					this.setState({routeData:res.data.travelData});
				});
		} else {
			console.log("Props", this.props.location.routeData);
			this.setState({ routeData: this.props.location.routeData });
		}
	}
	busSeatHandler = () => {
		const {routeData} = this.state;
		console.log(routeData.seats);
		const seats = [];
		for (let i = 0; i < routeData.seats; i++) {
			seats.push(<button className="bus-seat" key={uuidv4()} onClick={this.seatHandler}></button>);
		}
		return seats;
	};

	render() {
		if (true) {
			return (
				<div>
					<div className="center-container">
						<div className="bus-container">
							<div className="bus-content">
								{this.busSeatHandler()}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <Redirect to="/login" />;
		}
	}
}

export default BookingPage;
