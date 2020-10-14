import React from "react";
import "../css/OutlinedButtonComponent.scss";

export default function OutlinedButtonComponent(props) {
	return (
		<>
			<button
				className={`outline-btn ${props.className}`}
				onClick={props.onClick}
			>
				{props.innerHTML}
			</button>
		</>
	);
}
