import React from "react";
import "../css/SidebarBlockComponent.css";

export default function SidebarBlockComponent(props) {
	return (
		<div className="sidebar-block" onClick={props.onClick}>
			<h4 className="heading">{props.heading}</h4>
			<p className="sub-heading">{props.subHeading}</p>
		</div>
	);
}
