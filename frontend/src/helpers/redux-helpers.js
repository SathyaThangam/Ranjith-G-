import { sessionChange } from "../redux";

export const mapStateToProps = (state) => {
	return {
		session: state.loginSession,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		sessionChange: (session) => dispatch(sessionChange(session)),
	};
};