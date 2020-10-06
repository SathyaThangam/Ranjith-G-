import React, { useState } from "react";
//Context to pass around the user login session
//Used in: HeaderComponent,AuthenticateModalComponent
const SessionContext = React.createContext(false);
function SessionContextProvider(props) {
	const [session, setSession] = useState(false);
	return <SessionContext.Provider value={{session,setSession}}>{props.children}</SessionContext.Provider>;
}

export {SessionContext,SessionContextProvider};