const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	order_id: String,
	email: String,
	order_details: Array,
	order_completed_status: String,
	order_currency: String,
	order_payment_details: Object,
});

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;
