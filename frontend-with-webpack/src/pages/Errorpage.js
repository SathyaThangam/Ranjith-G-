import React from "react";
import { Link } from "react-router-dom";

import errorImg from "../../public/error404.svg";
import "../css/Errorpage.scss";

function Errorpage(props) {
	console.log(props.message);
	const defaultMessage =
		"They say that all roads lead to Rome. But we've lost our way, so let's try going home.";
	return (
		<div className="error-img-container">
			<img src={errorImg} alt="404 not found" />
			<h1>
				{props.message === undefined ? defaultMessage : props.message}
			</h1>
			<h1>
				<Link to="/">Home</Link>
			</h1>
		</div>
	);
}

export default Errorpage;
