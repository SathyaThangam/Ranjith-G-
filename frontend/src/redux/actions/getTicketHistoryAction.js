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
			getRequest("https://jsonplaceholder.typicode.com/users","","",false)
			.then((response) => {
				const userID = response.data.map((user) => user.id);
				dispatch(fetchTicketSuccess(userID));
			})
			.catch((err) => {
				dispatch(fetchTicketFailure(err));
			});
	};
};
