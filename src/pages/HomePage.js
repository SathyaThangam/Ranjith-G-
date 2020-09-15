import React, { Component } from 'react';
import InputComponent from '../Components/InputComponent';
import InputDropdownComponent from '../Components/InputDropdownComponent';

import "../css/Homepage.scss";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.resultRef = React.createRef();
		this.state = {
			startDate: new Date()
		}
	}

	resultHandler = () => {
		this.resultRef.current.scrollIntoView({
			behavior: "smooth",
		});
	};

	handleChange = (date) => {
		this.setState({
			startDate: date,
		});
	};

	render() {
		return (
			<div>
				<div className="search-container">
					<div className="input-group">
						<InputDropdownComponent
							type="text"
							placeholder="From.. "
						/>
						<InputDropdownComponent
							type="text"
							placeholder="To.. "
						/>
						<InputComponent
							type="date"
							placeholder=""
						/>
						<div className="search-btn-container">
							<button
								className="search-btn"
								onClick={this.resultHandler}
							>
								Search{" "}
								{/* <SearchIcon fontSize="small" className="icon" /> */}
							</button>
						</div>
					</div>
				</div>
				<div
					id="search-results"
					ref={this.resultRef}
					className="search-results-container"
				>
					<h1>Search Results</h1>
				</div>
			</div>
		);
	}
}

export default HomePage;
