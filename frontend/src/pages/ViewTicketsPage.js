import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketHistory } from "../redux";
import { postRequest } from "../helpers/request-helper";
function ViewTicketsPage() {
	const ticketHistory = useSelector((state) => state.historyStore.data);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTicketHistory());
	}, [dispatch]);

	const button403Handler = () => {
		postRequest("/data/getorders")
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<ul>
				{ticketHistory.map((user) => (
					<li>{user}</li>
				))}
			</ul>
			<button onClick={button403Handler}>403</button>
		</div>
	);
}

export default ViewTicketsPage;
