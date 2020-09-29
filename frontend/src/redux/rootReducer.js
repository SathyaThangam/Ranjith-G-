import { combineReducers } from "redux";
import sessionReducer from "./reducers/sessionReducer";
import ticketReducer from "./reducers/ticketReducer";
import getTicketHistoryReducer from "./reducers/getTicketHistoryReducer";
import coordsReducer from "./reducers/coordsReducer";

const rootReducer = combineReducers({
	sessionStore: sessionReducer,
	ticketStore: ticketReducer,
	historyStore:getTicketHistoryReducer,
	coordsStore:coordsReducer
});

export default rootReducer
