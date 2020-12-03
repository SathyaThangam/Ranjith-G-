const express = require("express");
const router = express.Router();

const {
	getMatchingDishesController,
	getMatchingLocationController,
	getMatchingRestaurantsController,
	getRestaurantsByLocationController,
} = require("../controllers/data-controllers.js");

router.get("/dishes", getMatchingDishesController);

router.get("/location", getMatchingLocationController);

router.get("/restaurants", getMatchingRestaurantsController);

router.get("/restaurantsByLocation", getRestaurantsByLocationController);

module.exports = router;
