import React, { Profiler, useEffect,useState } from "react";
import { onRenderCallBack,helperLoadData } from "../helper";
function JSONplaceholderComponent() {
	const [data, setData] = useState([])
	useEffect(() => {
        helperLoadData("https://jsonplaceholder.typicode.com/users").then(response => {
			setData(response);
		})
        console.log(data);
	},[]);

	return (
		<Profiler id="JSONplaceholderComponent-norm" onRender={onRenderCallBack}>
			<>
				{data &&
					data.map((user) => (
						<h2 key={user.id}>{user.name}</h2>
					))}
			</>
		</Profiler>
	);
}

export default (JSONplaceholderComponent);
