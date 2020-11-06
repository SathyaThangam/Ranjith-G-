import React from "react";

function MobileOverlayComponent({ children }) {
	// const style = {

	// }

	return (
		<div
			style={{
				zIndex: 9999,
				height: "100vh",
                position: "absolute",
                top:0,
                width:"100%",
                display:"block",

			}}
		>
			{children}
		</div>
	);
}

export default MobileOverlayComponent;
