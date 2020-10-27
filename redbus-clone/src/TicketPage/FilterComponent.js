import React from "react";
import "../scss/FilterComponent.scss";
function FilterComponent() {
	return (
		<div className="filter-container">
			<div className="fitler-container-title">FILTERS</div>
			<div className="filter-criteria">Live Tracking (99)</div>
			<div className="filter-criteria">Red Deals (19)</div>
			<div className="filter-criteria">Reschedulable (7)</div>
			<div className="filter-title">DEPARTURE TIME</div>
			<ul>
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
			<ul>
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
			<ul>
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
				<li>WIFI (19)</li>
				<li>Water Bottle (7)</li>
				<li>Blankets (5)</li>
				<li>Charging Point(5)</li>
				<li>Movie (6)</li>
				<li>Track My Bus (99)</li>
				<li>Emergency Contact Nu.. (47)</li>
			</ul>
		</div>
	);
}

export default FilterComponent;
