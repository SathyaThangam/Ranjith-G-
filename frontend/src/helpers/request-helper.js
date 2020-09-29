const axios = require("axios");

const API_URL = "http://localhost:8080";
exports.postRequest = async (path, data, options,use_api=true) => {
	
	const request_url = use_api ? API_URL + path : path;

	try {
		return await axios.post(request_url, data, {
			withCredentials: true,
			...options,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getRequest = async (path, data, options,use_api=true) => {
	
	const request_url = use_api ? API_URL + path : path;

	try {
		return await axios.get(request_url, data, {
			withCredentials: true,
			...options,
		});
	} catch (error) {
		console.log(error);
	}
};
