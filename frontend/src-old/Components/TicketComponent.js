import React, { Component } from "react";
import "../css/TicketComponent.scss";
import { updateTicket } from "../redux";
import { connect } from "react-redux";
class TicketComponent extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			gender: "",
			name: "",
			age: "",
		};
	}

	handleGenderInput = (value) => {
		this.setState({ gender: value });
	};

	handleNameInput = (value) => {
		this.setState({ name: value });
	};

	handleAgeInput = (value) => {
		this.setState({ age: value });
	};

	componentDidUpdate(prevProps,prevState) {
		if(prevState !== this.state)
			this.props.updateTicket({
				seat: this.props.seatNumber,
				...this.state,
			});
	}

	render() {
		return (
			<div className="ticket-container">
				<div>Seat No. {this.props.seatNumber}</div>
				<div>
					<input
						type="text"
						placeholder="Traveller Name"
						value={this.props.ticketData.name}
						onChange={(e) => this.handleNameInput(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Age"
						value={this.props.ticketData.age}
						onChange={(e) => this.handleAgeInput(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Gender"
						value={this.props.ticketData.gender}
						onChange={(e) => this.handleGenderInput(e.target.value)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state,ownProps) => {
	const tickets = state.ticketStore.ticketData;
	 const index = tickets
			.map((item) => item.seat)
			.indexOf(ownProps.seatNumber);
	return {
		ticketData: tickets[index],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateTicket:(ticket) => dispatch(updateTicket(ticket))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(TicketComponent);
