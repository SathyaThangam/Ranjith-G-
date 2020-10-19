import React, { useState, useEffect } from "react";
import "../css/TicketComponent.scss";
import { updateTicket } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { isValidName } from "../helpers/helper";
function TicketComponent(props) {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("Male");

	const [nameError, setNameError] = useState(false);

	const selectorFn = (state) => {
		const tickets = state.ticketStore.ticketData;
		const index = tickets
			.map((item) => item.seat)
			.indexOf(props.seatNumber);
		return tickets[index];
	};

	const ticketData = useSelector(selectorFn);
	const dispatch = useDispatch();

	useEffect(() => {
		const ticket = {
			seat: props.seatNumber,
			name,
			age,
			gender,
		};
		dispatch(updateTicket(ticket));
	}, [props.seatNumber, gender, name, age]);

	const nameController = (inputEvent) => {
		setNameError(!isValidName(inputEvent.target.value));
		setName(inputEvent.target.value);
	};

	return (
		<div className="ticket-container">
			<div>Seat No. {props.seatNumber}</div>
			<div className="ticket-input-container">
				<input
					type="text"
					className={nameError ? "error" : ""}
					placeholder="Traveller Name"
					value={ticketData.name}
					onChange={nameController}
				/>
				<input
					type="number"
					placeholder="Age"
					value={ticketData.age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<select
					type="text"
					placeholder="Gender"
					value={ticketData.gender}
					onChange={(e) => setGender(e.target.value)}
				>
					<option>Male</option>
					<option>Female</option>
					<option>Rather not say</option>
				</select>
			</div>
		</div>
	);
}

export default TicketComponent;
