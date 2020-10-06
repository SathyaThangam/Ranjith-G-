import {FETCH_HISTORY_REQUEST,FETCH_HISTORY_SUCCESS,FETCH_HISTORY_FAILURE} from "../constants/getTicketHistoryConstant";
import { getRequest } from "../../helpers/request-helper";
export const fetchTicketRequest = () => {
	return {
		type: FETCH_HISTORY_REQUEST,
	};
};

export const fetchTicketSuccess = (users) => {
	return {
		type: FETCH_HISTORY_SUCCESS,
		payload: users,
	};
};

export const fetchTicketFailure = (error) => {
	return {
		type: FETCH_HISTORY_FAILURE,
		payload: error,
	};
};

export const fetchTicketHistory = () => {
	return function (dispatch) {
		dispatch(fetchTicketRequest());
			getRequest("/data/getorders")
				.then((response) => {
					console.log(response);
					const ticketData = response.data;
					dispatch(fetchTicketSuccess(ticketData));
					// if(ticketData.isArray())
					// 	dispatch(fetchTicketSuccess(ticketData));
					// else
					// 	dispatch(fetchTicketSuccess([ticketData]));
				})
				.catch((err) => {
					dispatch(fetchTicketFailure(err));
				});
	};
};
