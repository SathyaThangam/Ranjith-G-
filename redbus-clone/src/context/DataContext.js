import React, { useState } from "react";
//Context to pass around the user search parameters

const initialContext = [];
const DataContext = React.createContext(initialContext);

const withDataContext = (WrappedComponent) => {
	
    function WithDateContext(props){
        const [data,setData] = useState(initialContext);
        return (
            <DataContext.Provider
                value={{
                    data,
                    setData:setData
                }}
            >
                <WrappedComponent {...props}/>
            </DataContext.Provider>
        );
    }
    return WithDateContext;
};

export {DataContext,withDataContext};
