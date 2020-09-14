import React from "react";
import "../css/InputComponent.scss";

function InputComponent(props) {
	return (
		<div className="input-container">
			<input
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
}

export default InputComponent;
