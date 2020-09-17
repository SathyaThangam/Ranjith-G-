import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//TODO add loading bar
//TODO fix the bug on booking/
class BookingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		console.log("id", this.props.match.params.id);
		console.log("Props", this.props.location.routeData);
	}

	render() {
		if (this.props.location.routeData !== undefined) {
			return (
				<div>
					<h1>Booking</h1>
				</div>
			);
		} else {
			return <Redirect to="/login" />
		}
	}
}

export default BookingPage;
