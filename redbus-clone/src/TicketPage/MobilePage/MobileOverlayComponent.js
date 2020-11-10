import React from "react";

function MobileOverlayComponent({ children,style }) {
	const initialStyle = {
		height: "100vh",
		position: "absolute",
		top: 0,
		width: "100%",
		display: "block",
		zIndex: 9999,
		...style
	};

	return (
		<div
			style={initialStyle}
		>
			{children}
		</div>
	);
}

export default MobileOverlayComponent;
