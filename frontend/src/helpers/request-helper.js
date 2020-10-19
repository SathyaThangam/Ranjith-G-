const axios = require("axios");
const Cookie = require("js-cookie");
// const API_URL = "http://localhost:8080";
const API_URL = "";
export const postRequest = async (path, data, options, use_api = true) => {
	const request_url = use_api ? API_URL + path : path;
	const sessionID = Cookie.get("sessionID");
	const request_data = { sessionID, ...data };
	// console.log(request_url);
	try {
		return await axios.post(request_url, request_data, {
			withCredentials: true,
			...options,
		});
	} catch (error) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		}
		console.log(error.response);
		throw new Error(error);
	}
};

export const getRequest = async (path, data, options, use_api = true) => {
	const request_url = use_api ? API_URL + path : path;
	const sessionID = Cookie.get("sessionID");
	const request_data = { sessionID, ...data };
	try {
		return await axios.get(request_url, {
			params: { ...request_data },
			withCredentials: true,
			...options,
		});
	} catch (error) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		}
		console.log(error.response);
		throw new Error(error);
	}
};
