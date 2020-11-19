import React from "react";
import "../App.css";
function InputComponent({ type, placeholder,maxLength, value, onChange }) {
	return (
		<input
			className="room-input"
			type={type}
			placeholder={placeholder}
			value={value}
			maxLength={maxLength}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}

export default InputComponent;
