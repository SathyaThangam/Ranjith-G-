import React, { useState } from "react";
//Context to pass around the user search parameters

const initialContext = "";
const RoomContext = React.createContext(initialContext);

const withRoomContext = (WrappedComponent) => {
	function WithRoomContext(props) {
		const [activeRoomID, setActiveRoomID] = useState("");
		return (
			<RoomContext.Provider
				value={{
					activeRoomID,
					setActiveRoomID
				}}
			>
				<WrappedComponent {...props} />
			</RoomContext.Provider>
		);
	}
	return WithRoomContext;
};

export { RoomContext, withRoomContext };
