//filter cities
exports.getMatchingCities = (city) => {
	const cities = require("../data/cities-name-list.json");
	return cities.filter((value) =>
		value.toLowerCase().includes(city.toLowerCase())
	);
};
//validation
exports.validateEmail = (value) => {
	const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(value);
};

exports.validatePassword = (value) => {
	let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	return re.test(value);
};

exports.validateConfirmPassword = (password, confirmPassword) => {
	if (confirmPassword === "") return false;
	else return password === confirmPassword;
};

//Format error message while Login/Signup
exports.formatErrorMessage = (prevMessage, newMessage) => {
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
exports.formatDate = formatDate;

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
exports.formatAMPM = formatAMPM;

exports.resetAuthenticationState = () => {
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

exports.getTravelTimeObject = (sourceTime, destinationTime) => {
	return {
		sourceTimeformat: formatAMPM(sourceTime),
		sourceDateformat: formatDate(sourceTime),
		destTimeformat: formatAMPM(destinationTime),
		destDateformat: formatDate(destinationTime),
	};
};

exports.isAuthenticated = () => {
	const Cookie = require("js-cookie");
	const sessionID = Cookie.get("sessionID");
	const session = sessionID !== undefined;
	console.log(session);
	return session;
};
