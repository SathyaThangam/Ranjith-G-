import React from 'react';
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchTicketHistory } from "../redux";
function ViewTicketsPage() {
	const ticketHistory = useSelector(state => state.historyStore.data);

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTicketHistory())
	}, [dispatch])

	return (
		<div>
			<ul>
				{
					ticketHistory.map(user => <li>{user}</li>)
				}
			</ul>
		</div>
	)
}

export default ViewTicketsPage

