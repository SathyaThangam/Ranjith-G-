import { FETCH_HISTORY_REQUEST,FETCH_HISTORY_SUCCESS,FETCH_HISTORY_FAILURE } from "../constants/getTicketHistoryConstant";

const initialState = {
	loading: false,
	data: [],
	error: "",
};

const getTicketHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_HISTORY_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_HISTORY_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		case FETCH_HISTORY_FAILURE:
			return {
				...state,
				loading: false,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getTicketHistoryReducer