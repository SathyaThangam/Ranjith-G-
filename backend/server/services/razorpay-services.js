const Razorpay = require("razorpay");
const axios = require("axios");
const uid = require("uid");
//Razorpay instance
const instance = new Razorpay({
	key_id: process.env.RAZORPAY_API_KEY,
	key_secret: process.env.RAZORPAY_API_SECRET,
});

//Generate order object
exports.generateRazorpayOrder = async (amount) => {
	if (typeof amount !== "number") throw new Error("Invalid amount");
	try {
		const options = {
			amount: amount * 100, // amount  == Rs 10
			currency: "INR",
			receipt: `receipt#${uid(16)}`,
			payment_capture: 0, // 1 for automatic capture // 0 for manual capture
		};
		return await instance.orders.create(options);
	} catch (err) {
		throw new Error(err);
	}
};

//Capture Payment
exports.capturePaymentRazorpay = async (amount, paymentId) => {
	if (typeof amount !== "number") throw new Error("Invalid amount");
	const url = `https://${process.env.RAZORPAY_API_KEY}:${process.env.RAZORPAY_API_SECRET}@api.razorpay.com/v1/payments/${paymentId}/capture`;
	const data = { amount: amount * 100, currency: "INR" };
	try {
		return await axios.post(url, data);
	} catch (err) {
		throw new Error(err);
	}
};
