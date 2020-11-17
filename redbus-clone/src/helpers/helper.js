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
