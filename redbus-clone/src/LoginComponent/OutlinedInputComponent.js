import React from "react";

function OutlinedInputComponent({ type, value, placeholder, onChange }) {
	return (
		<input
			style={{
                padding: "10px",
                margin:"10px",
                width:"80%",
                fontSize:"16px",
				border: "1px solid black",
				borderRadius: "3px",
			}}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default OutlinedInputComponent;
