import React, { useState } from "react";
//Context to pass around the user search parameters

const SessionContext = React.createContext(false);

const withSessionContext = (WrappedComponent) => {
	function WithSessionContext(props) {
		const [value, setValue] = useState(false);
		return (
			<SessionContext.Provider
				value={{
					value,
					setValue,
				}}
			>
				<WrappedComponent {...props} />
			</SessionContext.Provider>
		);
	}
	return WithSessionContext;
};

export { SessionContext, withSessionContext };
