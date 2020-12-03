const Restaurant = require("../models/Restaurant");

exports.getMatchingDishesController = async (req, res) => {
	const dishName = req.query.dish;
	const location = req.query.location;
	//   {
	//   'dishes.name': {
	//     '$regex': 'Gu'
	//   }
	// }
	Restaurant.find({});
};

exports.getMatchingLocationController = async (req, res) => {
	const location = req.query.location;
	try {
		if (location) {
			const locationData = await Restaurant.find(
				{
					"location.locality_verbose": {
						$regex: location,
						$options: "i",
					},
				},
				"-_id location.city location.locality_verbose"
			);
			res.status(200).send(locationData);
		} else res.sendStatus(400);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

exports.getMatchingRestaurantsController = async (req, res) => {
	const { location, restaurant } = req.query;
	try {
		if (location && restaurant) {
			const locationData = await Restaurant.find(
				{
					"location.city": location,
					name: {
						$regex: restaurant,
						$options: "i",
					},
				},
				"-_id"
			);
			res.status(200).send(locationData);
		} else res.sendStatus(400);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

exports.getRestaurantsByLocationController = async (req, res) => {
	const { location } = req.query;
	try {
		if (location) {
			const restaurants = await Restaurant.find(
				{
					"location.city": {
						$regex: location,
					},
				},
				"-_id location.locality_verbose"
			);
			res.status(200).send(restaurants);
		} else res.sendStatus(400);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
