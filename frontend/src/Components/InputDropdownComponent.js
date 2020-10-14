import React, { useState } from "react";

import { getMatchingCities } from "../helpers/helper";
import "../css/InputDropDownComponent.scss";

function InputDropdownComponent(props) {
	const [dropdownContent, setDropdownContent] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [dropDownVisibility, setDropDownVisibility] = useState(false);
	const searchResults = (value) => {
		setInputValue(value);
		props.handleInput(value);
		var displayResults = "";
		var results = getMatchingCities(value);
		const generateKey = (pre, i) => `${pre}_${i}_${new Date().getTime()}`;

		if (results.length === 0) displayResults = <p>{"No results Found"}</p>;
		else
			displayResults = results.slice(0, 12).map((city, i) => (
				<p
					key={generateKey(city, i)}
					onClick={() => {
						setInputValue(city);
						props.handleInput(city);
						setDropDownVisibility(false);
					}}
				>
					{city}
				</p>
			));
		setDropdownContent(displayResults);
		setDropDownVisibility(true);
	};
	return (
		<div className="input-dropdown-container">
			<input
				type={props.type}
				placeholder={props.placeholder}
				value={inputValue}
				onChange={(e) => searchResults(e.target.value)}
			/>

			<div
				className={
					dropDownVisibility ? "dropdown-content visible" : "dropdown-content"
				}
			>
				{dropdownContent}
			</div>
		</div>
	);
}

export default InputDropdownComponent;
