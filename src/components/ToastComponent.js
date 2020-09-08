import React from "react";
import "../css/ToastComponent.css";

export default function ToastComponent(props) {
	return <div className={`snackbar ${props.className}`}>{props.message}</div>;
}
