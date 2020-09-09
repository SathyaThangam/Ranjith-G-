import React, { Component } from "react";
import "../css/SearchComponent.css";
import showData from "../data/showData.json";
import SidebarBlockComponent from "./SidebarBlockComponent";
import SliderComponent from './SliderComponent';
import axios from "axios";

export default class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults:'Your results appear here'
		}
	}

	filterData = (category) => {
		console.log(category);
		category = category.toLowerCase();
		axios
		.post('http://localhost:8000/data',{'category':category})
		.then((response) => {
			this.loadData(response.data)
		})
		.catch(err => console.log(err));	
	}

	loadData = (filterResults) => {
		const results = [];

		const settings_row = {
			dots: false,
			infinite: false,
			speed: 500,
			arrows: true,
			slidesToShow: 2,
			slidesToScroll: 2,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
						dots: true,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						initialSlide: 2,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		};
		for(const category in filterResults){
			let row = (
				<SliderComponent
					key = {category}
					container="modal-gallery"
					heading={category}
					data={filterResults[category]}
					settings={settings_row}
				/>
			);
			results.push(row);
		}

		this.setState({ searchResults: results });

	}

	contentClick(e){
		e.stopPropagation();
	}

	render() {
		return (
			<div className="modal" onClick={this.props.handleSearch}>
				<div className="modal-container" onClick={this.contentClick}>
					<h1>Search</h1>
					<div className="modal-content">
						<div className="modal-content-left">
							<h3 className="modal-left-heading">Categories</h3>
							<SidebarBlockComponent
								heading="Language"
								subHeading="Shows"
								onClick={(e) => this.filterData("language")}
							/>
							<SidebarBlockComponent
								heading="Status"
								subHeading="Shows"
								onClick={(e) => this.filterData("status")}
							/>
							<SidebarBlockComponent
								heading="Genre"
								subHeading="Shows"
								onClick={(e) => this.filterData("genres")}
							/>
						</div>
						<div className="modal-content-right">
							{this.state.searchResults}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
