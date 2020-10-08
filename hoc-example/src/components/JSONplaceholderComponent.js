import React, { useEffect } from "react";
import withAPIfunctionality from "./withAPIFunctionality";
function JSONplaceholderComponent(props) {

	useEffect(() => {
        props.loadData("https://jsonplaceholder.typicode.com/users");
        console.log(props.response);
	},[]);

	return (
		<div>
			{props.response &&
				props.response.map((user) => <h2 key={user.id}>{user.name}</h2>)}
		</div>
	);
}

export default withAPIfunctionality(JSONplaceholderComponent);
