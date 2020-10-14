import { ADD_TICKET,UPDATE_TICKET, DELETE_TICKET } from "../constants/ticketConstant";

export const addTicket = (newTicket) => {
	return {
		type: ADD_TICKET,
		payload: newTicket,
	};
};

export const updateTicket = (ticket) => {
	return {
		type: UPDATE_TICKET,
		payload: ticket,
	};
};

export const deleteTicket = (ticket) => {
	return {
		type: DELETE_TICKET,
		payload: ticket,
	};
};
