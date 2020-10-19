const ticketData = require("../data/ticketData.json");
exports.getTravels = (req, res) => {
	const response = [];
	ticketData.forEach((item, i) => {
		if (
			req &&
			req.query &&
			req.query.source &&
			item.source.toLowerCase() === req.query.source.toLowerCase()
		) {
			response.push(item);
		}
	});
	if (response.length === 0) {
		res.status(404).send("Unavailable");
	} else {
		res.json(response);
	}
};

exports.getBusDetails = async (req, res) => {
	const busData = ticketData.filter((item) => item.id === req.query.busid)[0];
	// if (busData !== undefined) res.json({ travelData: busData });
	if (busData !== undefined) {
		const {
			getSeatsByRouteID,
			getRouteIDByLocation,
		} = require("../helpers/DB-helper");

		try {
			getRouteIDByLocation(busData.source, null)
				.then(async (route_id) => {
					const bookedSeats = await getSeatsByRouteID(route_id);

					res.json({ travelData: busData, bookedSeats });
				})
				.catch((err) => {
					res.sendStatus(500);
				});
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	} else res.sendStatus(403);
};

exports.getOrders = async (req, res) => {
	console.log("request received");
	const { getOrderByUser } = require("../helpers/DB-helper");
	const response = await getOrderByUser(req.user_id);
	if (response) {
		res.status(200).json(response);
	}
};
