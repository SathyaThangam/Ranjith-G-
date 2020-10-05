import React from "react";
// import "/loading.gif";
import "../css/LazyLoadingBarComponent.scss";
function LazyLoadingBarComponent() {
	return (
		<div className="loading-container">
			<img src="loading.gif" alt="Loading the page" />
		</div>
	);
}

export default LazyLoadingBarComponent;
