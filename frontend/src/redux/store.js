import { createStore,applyMiddleware } from "redux";
import { logger } from "redux-logger";
import sessionReducer from "./reducers/sessionReducer";
// import thunk from "redux-thunk";

const store = createStore(sessionReducer,applyMiddleware(logger))

export default store
