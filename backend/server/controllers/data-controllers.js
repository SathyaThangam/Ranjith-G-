const ticketData = require("../data/ticketData.json");
exports.getTravels = (req, res) => {
	const response = [];
	ticketData.forEach((item, i) => {
		if (item.source.toLowerCase() === req.body.source.toLowerCase()) {
			response.push(item);
		}
	});
	if (response.length === 0) {
		res.status(404).send("Unavailable");
	} else {
		res.json(response);
	}
};


exports.getBusDetails = (req, res) => {
	const busData = ticketData.filter((item) => item.id === req.body.busid)[0];
	if (busData !== undefined) res.json({ travelData: busData });
	else res.sendStatus(403);
};