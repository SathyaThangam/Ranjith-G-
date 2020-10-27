import React, { useState } from "react";
//Context to pass around the user search parameters

const initialContext = { source: "", destination: "", date: "" };
const DataContext = React.createContext(initialContext);

const withDataContext = (WrappedComponent) => {
	
    function WithDateContext(props){
        const [queryData,setQueryData] = useState(initialContext);
        return (
            <DataContext.Provider
                value={{
                    queryData,
                    setQueryData:setQueryData
                }}
            >
                <WrappedComponent {...props}/>
            </DataContext.Provider>
        );
    }
    return WithDateContext;
};

export {DataContext,withDataContext};
