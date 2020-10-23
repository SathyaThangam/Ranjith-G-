import React from "react";
import "../scss/InputComponent.scss";
function InputComponent({ label,type,value,setValue,iconImg }) {
	const icon =
		iconImg !== undefined ? (
			<span className="icon-container">
				<img src={iconImg} alt="icon" />
			</span>
		) : (
			""
		);
	return (
		<div className="input-container">
			{icon}
			<input
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<label>{label}</label>
		</div>
	);
}

export default InputComponent;
