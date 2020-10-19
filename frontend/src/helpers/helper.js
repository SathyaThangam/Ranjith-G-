//filter cities
export const getMatchingCities = (city) => {
	const cities = require("../data/cities-name-list.json");
	return cities.filter((value) =>
		value.toLowerCase().includes(city.toLowerCase())
	);
};
//validation
export const validateEmail = (email) => {
	const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

export const validatePassword = (password) => {
	let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
	return re.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
	if (confirmPassword === "") return false;
	else return password === confirmPassword;
};

export const isValidName = (name) => (/^[A-Za-z]+$/).test(name);

export const isValidPhoneNo = (number) => (/^[0-9]{10}$/).test(number);

//Format error message while Login/Signup
export const formatErrorMessage = (prevMessage, newMessage) => {
	if (prevMessage !== "") return prevMessage + " / " + newMessage;
	else return newMessage;
};

// Format date to following formats:
//  DDD, DD-MM-YYYY or  Tue, 23-09-2020
// DD-MM-YYYY
// MM-DD-YYYY
const formatDate = (dateString, format = "DDD, DD-MM-YYYY") => {
	const date = new Date(dateString);
	var dd = String(date.getDate()).padStart(2, "0");
	var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = date.getFullYear();
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const day = days[date.getDay()];

	const newDateString = (first, second, third) =>
		first + "-" + second + "-" + third;

	var resultdate = newDateString(dd, mm, yyyy);

	switch (format.toUpperCase()) {
		case "MM-DD-YYYY":
			resultdate = newDateString(mm, dd, yyyy);
			break;
		case "DD-MM-YYYY":
			resultdate = newDateString(dd, mm, yyyy);
			break;
		default:
			resultdate = `${day}, ${newDateString(dd, mm, yyyy)}`;
			break;
	}
	return resultdate;
};
export { formatDate };

// format 24 hour to 12 hour format gets Date object returns string hh:mm am/pm
const formatAMPM = (dateString) => {
	const date = new Date(dateString);
	var hours = date.getHours();
	var minutes = date.getMinutes();

	var ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;

	return hours + ":" + minutes + " " + ampm;
};
export { formatAMPM };

const React = require("react");
export const formatAlert = (prev, newMessage) => (
	<>
		{prev}
		{newMessage}
	</>
);

export const resetAuthenticationState = () => {
	return {
		loginEmail: "",
		loginPwd: "",
		signupEmail: "",
		signupPwd: "",
		signupCPwd: "",
		loginModal: true,
		inputError: false,
		errorMessage: "",
		loginsuccess: false,
		successMessage: "",
	};
};

export const getTravelTimeObject = (sourceTime, destinationTime) => {
	return {
		sourceTimeformat: formatAMPM(sourceTime),
		sourceDateformat: formatDate(sourceTime),
		destTimeformat: formatAMPM(destinationTime),
		destDateformat: formatDate(destinationTime),
	};
};

export const isAuthenticated = () => {
	const Cookie = require("js-cookie");
	const sessionID = Cookie.get("sessionID");
	const session = sessionID !== undefined;
	// console.log(session);
	return session;
};

const getLocation = async () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = round(position.coords.latitude);
				const longitude = round(position.coords.longitude);
				resolve({ lat: latitude, lng: longitude });
			},
			(error) => reject(error),
			{
				enableHighAccuracy: true,
			}
		);
	});
};

export const getGeolocation = async () => {
	if ("geolocation" in navigator) {
		try {
			const data = await getLocation();
			console.log(data);
			return data;
		} catch (err) {
			throw new Error(err);
		}
	} else {
		console.log("Not Available");
		return null;
	}
};

const round = (value, position = 5) => {
	const x = position === 0 ? 1 : Math.pow(10, position);
	return Math.round(value * x) / x;
};
export { round };
