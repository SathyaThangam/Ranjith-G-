import React from "react";
function MobileTitleComponent({ children, style }) {
	const initialStyle = {
		color: "white",
		backgroundColor: "var(--red-color)",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		padding: "10px 3px",
		fontWeight: 700,
		position: "sticky",
		top: 0,
		zIndex: 9999,
	};

	return (
		<div
			style={{ ...initialStyle, ...style }}
			className="mobile-title-container"
		>
			{children}
		</div>
	);
}

export default MobileTitleComponent;
