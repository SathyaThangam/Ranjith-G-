import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchTicketHistory } from "../redux";
function ViewTicketsPage() {
	const ticketHistory = useSelector(
		(state) => state.historyStore.data,
		shallowEqual
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTicketHistory());
	}, [dispatch]);

	const button403Handler = () => {
		console.log(ticketHistory);
	};

	return (
		<div>
			<table>
				{ticketHistory.map((order) => {
					return (
						<tr>
							<td>{order.order_id}</td>
							<td>{order.route_id}</td>
							<td>{order.payment_id}</td>
							<td>{order.payment_status}</td>
							<td>Hello</td>
						</tr>
					);
				})}
			</table>
			<button onClick={button403Handler}>403</button>
		</div>
	);
}

export default ViewTicketsPage;
