const axios = require("axios");

const API_URL = "http://localhost:8080";
exports.postRequest = async (path, data, options) => {
	try {
		return await axios.post(API_URL + path, data, {
			withCredentials: true,
			...options,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getRequest = async (path, data, options) => {
	try {
		return await axios.get(API_URL + path, data, {
			withCredentials: true,
			...options,
		});
	} catch (error) {
		console.log(error);
	}
};
