import React, { useState } from "react";
import "../scss/InputComponent.scss";
function InputComponent({ label }) {
	const [inputValue, setInputValue] = useState("");

	return (
		<div className="input-container">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<label>{label}</label>
		</div>
	);
}

export default InputComponent;
