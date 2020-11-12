import React from "react";
import OrderFragment from "./OrderFragment";
import MobileTitleComponent from "../TicketPage/MobilePage/MobileTitleComponent";
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
			<div
				style={{
					backgroundColor: "#ddd",
					minHeight: "100vh",
					padding: "10px",
				}}
			>
				{dataObj.length > 0 ? (
					dataObj.map((order) => <OrderFragment order={order} />)
				) : (
					<h1>No Orders Found</h1>
				)}
			</div>
		</>
	);
}

export default DisplayTicketsPage;
