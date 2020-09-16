import React from "react";

import "../css/SearchResultComponent.scss";

function SearchResultComponent(props) {
	return (
		<div className="search-result">
			<p>{props.name}</p>
			<p>{props.agency}</p>
			<p>{props.source}</p>
			<p>{props.departure}</p>
			<p>{props.destination}</p>
			<p>{props.arrival}</p>
			<p>{props.seats}</p>
			<p>{props.price}</p>
			<button>Get a seat ▶</button>
		</div>
	);
}

export default SearchResultComponent;
