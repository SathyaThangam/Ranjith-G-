const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
	has_online_delivery: Number,
	photos_url: String,
	url: String,
	price_range: Number,
	apikey: String,
	user_rating: Object,
	R: Object,
	name: String,
	cuisines: String,
	is_delivering_now: Number,
	deeplink: String,
	menu_url: String,
	average_cost_for_two: Number,
	book_url: String,
	switch_to_order_menu: Number,
	offers: Object,
	has_table_booking: Number,
	location: Object,
	featured_image: String,
	zomato_events: Object,
	currency: String,
	id: String,
	thumb: String,
	establishment_types: Object,
	events_url: String,
	dishes: Array,
});

const Restaurant = mongoose.model("restaurant", RestaurantSchema);

module.exports = Restaurant;
