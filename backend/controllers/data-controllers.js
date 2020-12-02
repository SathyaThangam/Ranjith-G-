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
	console.log(location, typeof location);
	try {
		const locationData = await Restaurant.find(
			{
				"location.locality_verbose": {
					$regex: location,
					$options: "i",
				},
			},
			"location.city location.locality_verbose"
		);
		res.status(200).send(locationData);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

exports.getMatchingRestaurantsController = async (req, res) => {
	const { location, restaurant } = req.query;
	try {
		const locationData = await Restaurant.find({
			"location.city": location,
			name: {
				$regex: restaurant,
				$options: "i",
			},
		});
		res.status(200).send(locationData);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
