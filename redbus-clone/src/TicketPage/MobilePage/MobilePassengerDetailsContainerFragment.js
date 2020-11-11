import React from "react";

function MobilePassengerDetailsContainerFragment({ children,style }) {
	const combinedStyle = {
		backgroundColor: "white",
		boxShadow: "0px 0px 3px 0 rgba(0, 0, 0, 0.5)",
		padding: "15px",
        margin: "10px",
        ...style
	};

	return <div style={combinedStyle}>{children}</div>;
}

export default MobilePassengerDetailsContainerFragment;
