import React, { Component } from "react";
import axios from "axios";
const withAPIFunctionality = (WrappedComponent) => {
	class WithAPIFunctionality extends Component {
		constructor(props) {
			super(props);
			this.state = {
				response: [],
			};
		}

		loadData = async (link) => {
			try {
                const response = await axios.get(link);
				this.setState({ response: response.data });
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		render() {
			return (
				<WrappedComponent {...this.props} response={this.state.response} loadData={this.loadData}/>
			);
		}
	}
	return WithAPIFunctionality;
};

export default withAPIFunctionality;
