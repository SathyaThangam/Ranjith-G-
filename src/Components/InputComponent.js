import React from "react";
import "../css/InputComponent.scss";

function InputComponent(props) {
	return (
		<div className="input-container">
			<input type={props.type} placeholder={props.placeholder} />
		</div>
	);
}

export default InputComponent;
