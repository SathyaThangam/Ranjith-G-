import React from "react";
import leftArrow from "../../img/left_arrow.svg";
import rightArrow from "../../img/right_arrow.svg";
import "../../scss/MobileTitleComponent.scss";
import { formatDate } from "../helpers";
import {Link} from "react-router-dom";
function MobileTitleComponent() {
	const linkStyle = {
		textDecoration:"none"
	}
	return (
		<div className="mobile-title-container">
			<span className="back-btn">
				<Link style={linkStyle}  to="/">
					<img
						className="arrow-icon btn"
						src={leftArrow}
						alt="back"
					/>
				</Link>
			</span>
			<div className="title-content">Source to destination</div>
			<div className="mobile-date-container">
				<img className="arrow-icon btn" src={leftArrow} alt="go back" />
				<span className="date-content">{formatDate}</span>
				<img
					className="arrow-icon btn"
					src={rightArrow}
					alt="go forward"
				/>
			</div>
		</div>
	);
}

export default MobileTitleComponent;
