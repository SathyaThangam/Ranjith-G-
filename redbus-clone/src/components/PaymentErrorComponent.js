import React from "react";
import { useEffect } from "react";
function PaymentErrorComponent({ setShow }) {
	useEffect(() => {
		setInterval(() => setShow(false), 2000);
	}, []);

	return (
		<div
			style={{
				width: "100%",
				position: "fixed",
				top: 0,
                bottom: 0,
                left:0,
                right:0,
				backgroundColor: "white",
				zIndex: 999999,
			}}
		>
			<p>Payment Error </p>
			<p>Please Try again later..</p>
			<p>Redirecting you to order page shortly...</p>
		</div>
	);
}

export default PaymentErrorComponent;
