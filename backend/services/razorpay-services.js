const Razorpay = require("razorpay");
const axios = require("axios");
const { nanoid } = require("nanoid");
const crypto = require("crypto");
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
			receipt: `receipt#${nanoid(16)}`,
			payment_capture: 0, // 1 for automatic capture // 0 for manual capture
		};
		return await instance.orders.create(options);
	} catch (err) {
		throw new Error(err);
	}
};

//verify authenticity of payment
exports.verifyPaymentRazorPay = (
	order_id,
	razorpay_payment_id,
	razorpay_signature
) => {
	const generated_signature = crypto
		.createHmac("sha256", process.env.RAZORPAY_API_SECRET)
		.update(order_id + "|" + razorpay_payment_id)
		.digest("hex");
	return generated_signature === razorpay_signature;
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
