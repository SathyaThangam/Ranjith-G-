import React, { useState } from "react";
//Context to pass around the user search parameters

const initialContext = {};
const LoginContext = React.createContext(initialContext);

const withLoginContext = (WrappedComponent) => {
	function WithLoginContext(props) {
		const [data, setData] = useState(initialContext);
		return (
			<LoginContext.Provider
				value={{
					data,
					setData: setData,
				}}
			>
				<WrappedComponent {...props} />
			</LoginContext.Provider>
		);
	}
	return WithLoginContext;
};

export { LoginContext, withLoginContext };
