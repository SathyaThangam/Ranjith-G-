import React, { Component } from "react";

import "../css/InputDropDownComponent.scss";

import cities from "../data/cities-name-list.json";

class InputDropdownComponent extends Component {
	constructor(props) {
		super(props);
		// console.log(cities);
		this.state = {
            dropdownContent: "",
            inputValue:''
		};
	}

	searchResults = (value) => {
        this.setState({inputValue:value})
        var displayResults = ''
        const results =  cities.filter(city => city.toLowerCase().includes(value.toLowerCase()));
        // console.log(results);
        if(results.length === 0)
            displayResults = <p>{'No results Found'}</p>;
        else
            displayResults = results.map(city => <p onClick = {() => this.setState({inputValue:city})}>{city}</p>)
        this.setState({dropdownContent : displayResults});
    };

	render() {
		return (
			<div className="input-container">
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
