import React, { Component } from "react";

import {getMatchingCities} from "../helpers/helper";
import "../css/InputDropDownComponent.scss";

class InputDropdownComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownContent: "",
			inputValue: "",
		};
	}

	searchResults = (value) => {
		this.setState({ inputValue: value });
		this.props.handleInput(value);
		var displayResults = "";
		var results = getMatchingCities(value);

		const generateKey = (pre, i) => `${pre}_${i}_${new Date().getTime()}`;
		
		if (results.length === 0) displayResults = <p>{"No results Found"}</p>;
		
		else
			displayResults = results.map((city, i) => (
				<p
					key={generateKey(city, i)}
					onClick={() => {
						this.setState({ inputValue: city });
						this.props.handleInput(city);
					}}
				>
					{city}
				</p>
			));
		this.setState({ dropdownContent: displayResults });
	};

	render() {
		return (
			<div className="input-dropdown-container">
				<input
					type={this.props.type}
					placeholder={this.props.placeholder}
					value={this.state.inputValue}
					onChange={(e) => this.searchResults(e.target.value)}
				/>
				<div className="dropdown-content">
					{this.state.dropdownContent}
				</div>
			</div>
		);
	}
}

export default InputDropdownComponent;
