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

