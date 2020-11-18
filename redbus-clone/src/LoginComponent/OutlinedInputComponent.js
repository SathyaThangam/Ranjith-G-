import React from "react";

function OutlinedInputComponent({ type, value, placeholder, onChange, style }) {
	const finalStyle = {
		padding: "10px",
		margin: "10px 10px",
		width: "90%",
		fontSize: "16px",
		border: "1px solid black",
		borderRadius: "3px",
		boxSizing: "border-box",
		...style,
	};
	return (
		<input
			style={finalStyle}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default OutlinedInputComponent;
