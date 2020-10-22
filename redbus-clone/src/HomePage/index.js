import React from "react";
import "../scss/HomePage.scss";
import InputComponent from "../components/InputComponent";
function HomePage() {
	return (
		<div>
			<div className="img-container"></div>
			<div className="img-content">
				<div className="search-container">
                    <InputComponent label="FROM"/>
                </div>
			</div>
		</div>
	);
}

export default HomePage;
