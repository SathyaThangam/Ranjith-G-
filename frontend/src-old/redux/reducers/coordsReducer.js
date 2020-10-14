import { SET_COORDINATES } from "../constants/coordsConstant";

const initialState = {
	lat: 0.0,
	lng: 0.0,
};

const coordsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COORDINATES:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default coordsReducer;
