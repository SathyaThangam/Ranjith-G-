import React from "react";
import "../css/InputComponent.scss";

function InputComponent(props) {
	return (
		<div
			className={
				props.className === undefined
					? "input-container"
					: `input-container ${props.className}`
			}
		>
			<label>{props.label}</label>
			<input
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				onClick={props.onClick}
			/>
		</div>
	);
}

export default InputComponent;
