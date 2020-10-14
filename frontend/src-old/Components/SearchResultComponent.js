import React from "react";
import { Link } from "react-router-dom";
import "../css/SearchResultComponent.scss";
import { formatDate } from "../helpers/helper.js";
function SearchResultComponent(props) {
	//React.Fragment used since we only need the table rows to be nested inside the table
	return (
		<React.Fragment>
			<tr className="search-result">
				<td>
					<label>{"Agency: "}</label>
					{props.agency}
				</td>
				<td>
					<label>{"Source: "}</label>
					{props.source}
				</td>
				<td>
					<label>{"Departure: "}</label>
					{formatDate(props.departure, "DD-MM-YYYY")}
				</td>
				<td>
					<label>{"Destination: "}</label>
					{props.destination}
				</td>
				<td>
					<label>{"Arrival: "}</label>
					{formatDate(props.arrival, "DD-MM-YYYY")}
				</td>
				<td>
					<label>{"Seats: "}</label>
					{props.seats}
				</td>
				<td>
					<label>{"Price: "}</label>
					{props.ticketprice}
				</td>
				<td>
					<Link
						style={{ textDecoration: "none", color: "inherit" }}
						to={{
							pathname: `/booking/${props.id}`,
							routeData: props,
						}}
					>
						<button>Get a seat ▶</button>
					</Link>
				</td>
			</tr>

			<tr className="search-result-card">
				<td colSpan="1" className="strong">
					<h3>
						{props.source} - {props.destination}
					</h3>
				</td>
				<td className="strong">{props.agency}</td>
				<td>
					{props.departure} to {props.arrival}
				</td>
				<td>
					<label>{"Available Seats: "}</label>
					<span className="strong">{props.seats}</span>
				</td>
				<td>
					<label>{"Price: "}</label>
					Rs.{props.price}
				</td>
				<td>
					<Link
						style={{
							width: "100%",
							textDecoration: "none",
							color: "inherit",
						}}
						to={{
							pathname: `/booking/${props.id}`,
							routeData: props,
						}}
					>
						<button>Get a seat ▶</button>
					</Link>
				</td>
			</tr>
		</React.Fragment>
	);
}

export default SearchResultComponent;
