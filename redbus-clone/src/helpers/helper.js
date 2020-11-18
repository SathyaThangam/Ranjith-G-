// const newDate = new Date();
const monthShortNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const formatDate = (newDate) =>
	`${newDate.getDate()} ${monthShortNames[newDate.getMonth()]}`;
const dayShortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const formatDay = (newDate) => `${dayShortNames[newDate.getDay()]}`;

export { formatDate, formatDay };

export const getBusData = (source, destination) => {
	const mockData = require("../data/bus-mock-data.json");
	return mockData.filter(
		(bus) =>
			bus["departure-stop"] === source &&
			bus["arrival-stop"] === destination
	);
};

export const changeDate = (currentDate, difference) => {
	const newDate = new Date(currentDate.valueOf());
	newDate.setDate(newDate.getDate() + difference);
	return newDate;
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

export const isAuthenticated = () => {
	const Cookie = require("js-cookie");
	const sessionID = Cookie.get("sessionID");
	return sessionID !== undefined;
};