import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketHistory } from "../redux";
function ViewTicketsPage() {
	const ticketHistory = useSelector((state) => state.historyStore.data);

	const dispatch = useDispatch();
	// dispatch(fetchTicketHistory());
	useEffect(() => {
		dispatch(fetchTicketHistory());
	}, [dispatch]);

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
						</tr>
					);
				})}
			</table>
		</div>
	);
}

export default ViewTicketsPage;
