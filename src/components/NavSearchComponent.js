import React, { Component } from "react";
import axios from 'axios';

import "../css/NavSearchComponent.css";

export default class NavSearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
            show: false,
            search:'',
            results:''
		};
    }
    
    searchHandler =() =>{
        const {search} = this.state;
        const searchData = {
            search:'shows',
            keyword:search
        };
        if(this.state.search === ' '){
            console.log("empty");
            this.setState({result:''});
        }
        else if(search !==  ' ' && search !== ''){
            const searchResults = [];
            axios
                .post('http://localhost:8000/data',searchData)
                .then((response) => {
                    const result = response.data;
                    // console.log(result);
                    for(const element in result){
                        searchResults.push(
						<a key={element} href={`/details/${element}`}>{result[element]}</a>
					);
                    }
                    this.setState({results:searchResults});
                    this.setState({show:true});
                })
                .catch((err) => console.log(err));
        }
        return true;
    }

    changeHandler(value) {
        this.setState({search:value})
        this.searchHandler();
    }

	render() {
		return (
			<div
				className="dropdown"
				onClick={() => this.setState({ show: false })}
			>
				<div style={{display:"flex"}}>
					<input
						type="search"
						className="nav-search"
                        placeholder="Search..."
                        onChange = {(e) =>  this.changeHandler(e.target.value) }
					/>
					<button className="search-btn" onClick={this.searchHandler}>
                        Search
					</button>
				</div>

				<div
					className={
						this.state.show
							? "dropdown-search show"
							: "dropdown-search"
					}
				>
					{this.state.results}
				</div>
			</div>
		);
	}
}
