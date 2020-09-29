import { combineReducers } from "redux";
import sessionReducer from "./reducers/sessionReducer";
import ticketReducer from "./reducers/ticketReducer";
import getTicketHistoryReducer from "./reducers/getTicketHistoryReducer";
const rootReducer = combineReducers({
	sessionStore: sessionReducer,
	ticketStore: ticketReducer,
	historyStore:getTicketHistoryReducer
});

export default rootReducer
