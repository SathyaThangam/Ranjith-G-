import React, { Component } from "react";
import "../css/HomePage.css";
import showData from "../data/showData.json";

// slick imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NavBarComponent from "../components/NavBarComponent";
import SliderComponent from "../components/SliderComponent";
import SidebarBlockComponent from "../components/SidebarBlockComponent";
import SearchComponent from "../components/SearchComponent";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchComponent: "",
		};
	}

	closeSearch = () => {
		this.setState({ searchComponent: "" });
	};

	searchHandler = () => {
		this.setState({
			searchComponent: (
				<SearchComponent handleSearch={this.closeSearch} />
			),
		});
	};

	render() {
		const data_row_1 = showData;

		const settings_row = {
			dots: false,
			infinite: false,
			speed: 500,
			arrows: true,
			slidesToShow: 3,
			slidesToScroll: 3,
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

		const settings_banner = {
			infinite: true,
			speed: 500,
			autoplay: true,
			autoplayspeed: 1500,
			slidesToShow: 1.7,
			slidesToScroll: 1,
			centerMode: true,
			variableWidth: false,
		};

		const data_banner = ["ff6464", "ff8264", "ffaa64", "fff5a5"];

		return (
			<div className="home-content">
				<NavBarComponent
					history={this.history}
					googleSignIn={this.props.googleSignIn}
					fbSignin={this.props.fbSignin}
					localSignin={this.props.localSignin}
					handleFBsignin={this.props.handleFBsignin}
					handleLocalsignin={this.props.handleLocalsignin}
				/>
				<Slider className="banner-container" {...settings_banner}>
					{data_banner.map((item) => {
						return (
							<div key={item} className="banner-img-container">
								<img
									src={`https://via.placeholder.com/768x300/${item}`}
									alt="upcoming shows"
								/>
							</div>
						);
					})}
				</Slider>
				<div className="main-content">
					<div className="main-content-left">
						<h3 className="heading">Trending Searches</h3>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
						<SidebarBlockComponent
							heading="Tenet"
							subHeading="Movies"
							onClick={this.searchHandler}
						/>
					</div>
					<div className="main-content-right">
						{this.state.searchComponent}
						<SliderComponent
							container="gallery"
							heading="Events"
							data={data_row_1}
							settings={settings_row}
						/>
						<SliderComponent
							container="gallery"
							heading="Plays"
							data={data_row_1}
							settings={settings_row}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;
