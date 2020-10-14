import React,{Component} from "react";
//Context to pass around the user login session
//Used in: HeaderComponent,AuthenticateModalComponent
const SessionContext = React.createContext(false);
const withSessionContext = WrappedComponent => {
	class WithSessionContext extends Component {
		constructor(props) {
			super(props);
			this.state = {
				session: false,
			};
		}
		setSession = (value) => this.setState({ session: value });
		render() {
			return (
				<SessionContext.Provider value={{ session:this.state.session, setSession:this.setSession }}>
					<WrappedComponent {...this.props} />
				</SessionContext.Provider>
			);
		}
	}
	return WithSessionContext;
}




export {SessionContext,withSessionContext};