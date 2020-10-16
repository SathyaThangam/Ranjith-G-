import React, { useState,useEffect } from "react";
import "../css/AlertComponent.scss";
import PortalComponent from "./PortalComponent";
function AlertComponent(props) {
	const [close, setClose] = useState(false);

	useEffect(() => {
		setClose(false);
		return () => {
			
		}
	}, [props.children])
	if (!close)
		return (
			<PortalComponent>
				<div
					className={
						props.className === undefined
							? "alert"
							: `alert ${props.className}`
					}
				>
					<p>{props.children}</p>
					<div
						className="close"
						onClick={() => setClose(true)}
					>
						x
					</div>
				</div>
			</PortalComponent>
		);
	else return null;
}

export default AlertComponent;
