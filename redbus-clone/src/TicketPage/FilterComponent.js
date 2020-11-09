import React from "react";
import "../scss/FilterComponent.scss";
function FilterComponent() {
	return (
		<div className="filter-container">
			<div className="filter-container-title">FILTERS</div>
			<div className="filter-criteria">Live Tracking (99)</div>
			<div className="filter-criteria">Red Deals (19)</div>
			<div className="filter-criteria">Reschedulable (7)</div>
			<div className="filter-title">DEPARTURE TIME</div>
			<ul className="checkbox-container">
				<li>
					<input type="checkbox" />
					<label>Before 6 am (0)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>6 am to 12 pm (0)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>12 pm to 6 pm (41)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>After 6 pm (58)</label>
				</li>
			</ul>
			<div className="filter-title">BUS TYPES</div>
			<ul className="checkbox-container">
				<li>
					<input type="checkbox" />
					<label>SEATER (25)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>SLEEPER (86)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>AC (73)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>NON AC (26)</label>
				</li>
			</ul>
			<div className="filter-title">ARRIVAL TIME</div>
			<ul className="checkbox-container">
				<li>
					<input type="checkbox" />
					<label>Before 6 am (0)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>6 am to 12 pm (0)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>12 pm to 6 pm (41)</label>
				</li>
				<li>
					<input type="checkbox" />
					<label>After 6 pm (58)</label>
				</li>
			</ul>
			<div className="filter-title">BOARDING POINT</div>
			<input
				type="text"
				className="filter-search"
				placeholder="BOARDING POINT"
			/>
			<div className="filter-title">DROPPING POINT</div>
			<input
				type="text"
				className="filter-search"
				placeholder="DROPPING POINT"
			/>
			<div className="filter-title">OPERATOR</div>
			<input
				type="text"
				className="filter-search"
				placeholder="OPERATOR"
			/>
			<div className="filter-title">RTC BUS TYPE</div>
			<input
				type="text"
				className="filter-search"
				placeholder="RTC BUS TYPE"
			/>
			<div className="filter-title">AMENITIES</div>
			<ul className="amenity-label">
				<li className="filter-criteria">WIFI (19)</li>
				<li className="filter-criteria">Water Bottle (7)</li>
				<li className="filter-criteria">Blankets (5)</li>
				<li className="filter-criteria">Charging Point(5)</li>
				<li className="filter-criteria">Movie (6)</li>
				<li className="filter-criteria">Track My Bus (99)</li>
				<li className="filter-criteria">Emergency Contact Nu.. (47)</li>
			</ul>
		</div>
	);
}

export default FilterComponent;
