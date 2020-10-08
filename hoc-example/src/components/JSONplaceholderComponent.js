import React, { Profiler, useEffect } from "react";
import { onRenderCallBack } from "../helper";
import withAPIfunctionality from "./withAPIFunctionality";
function JSONplaceholderComponent(props) {
	useEffect(() => {
		props.loadData("https://jsonplaceholder.typicode.com/users");
		console.log(props.response);
	}, []);

	return (
		<Profiler id="JSONplaceholderComponent" onRender={onRenderCallBack}>
			<>
				{props.response &&
					props.response.map((user) => (
						<h2 key={user.id}>{user.name}</h2>
					))}
			</>
		</Profiler>
	);
}

export default withAPIfunctionality(JSONplaceholderComponent);
