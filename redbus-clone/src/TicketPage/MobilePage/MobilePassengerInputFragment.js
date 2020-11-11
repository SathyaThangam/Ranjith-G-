import React from "react";

function MobilePassengerInputFragment({
	style,
	type,
	placeholder,
	value,
	onChange,
}) {
	const combinedStyle = {
		padding: "10px",
		fontSize: "13px",
		border: "1px solid #ccc",
        borderRadius: "3px",
        margin:"5px 0px",
        width:"100%",
		...style,
	};
	return (
		<div style={{width:"100%",display:"flex"}}>
			<input
				style={combinedStyle}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}

export default MobilePassengerInputFragment;
