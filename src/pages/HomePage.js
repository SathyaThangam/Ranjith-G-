import React, { Component } from 'react'
import InputComponent from '../Components/InputComponent';
import "../css/Homepage.scss";
import SearchIcon from "@material-ui/icons/Search";


class HomePage extends Component {
    
    constructor(props) {
        super(props);

        this.resultRef = React.createRef();
    
    }
    
    resultHandler = () =>{
        this.resultRef.current.scrollIntoView({
            behavior:'smooth'
        });
    }

    render() {
        return (
			<div>
				<div className="search-container">
					<div className="input-group">
						<InputComponent type="text" placeholder="From.. " />
						<InputComponent type="text" placeholder="To.. " />
						<InputComponent type="text" placeholder="Date.. " />
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
