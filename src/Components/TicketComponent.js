import React, { Component } from "react";
import "../css/TicketComponent.scss"
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

	render() {
		return (
			<div className="ticket-container">
				<div>Seat No. {this.props.seatNumber}</div>
				<div>
					<input type="text" placeholder="Traveller Name" onChange={e => this.handleNameInput(e.target.value)}/>
					<input type="number" placeholder="Age" onChange={e => this.handleAgeInput(e.target.value)}/>
					<input type="text" placeholder="Gender"onChange={e => this.handleGenderInput(e.target.value)} />
				</div>
			</div>
		);
	}
}

export default TicketComponent;
