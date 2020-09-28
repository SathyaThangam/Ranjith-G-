import { combineReducers } from "redux";
import sessionReducer from "./reducers/sessionReducer";
import ticketReducer from "./reducers/ticketReducer";

const rootReducer = combineReducers({
	sessionStore: sessionReducer,
	ticketStore: ticketReducer,
});

export default rootReducer
