import React from "react";
import OrderFragment from "./OrderFragment";
import MobileTitleComponent from "../TicketPage/MobilePage/MobileTitleComponent";
import "../scss/DisplayTicketPage.scss";
function DisplayTicketsPage() {
	const dataObj = JSON.parse(localStorage.getItem("getBusOrders")) || [];
	return (
		<>
			<MobileTitleComponent style={{ justifyContent: "center" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "50vw",
					}}
				>
					<span>getBus</span>
					View Orders
				</div>
			</MobileTitleComponent>
			<div className="display-ticket-container">
				<div className="display-ticket-content">
					{dataObj.length > 0 ? (
						dataObj.map((order) => <OrderFragment order={order} />)
					) : (
						<h1>No Orders Found</h1>
					)}
				</div>
			</div>
		</>
	);
}

export default DisplayTicketsPage;
