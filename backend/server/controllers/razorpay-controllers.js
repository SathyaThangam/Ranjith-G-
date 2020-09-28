const Razorpay = require("razorpay");
const request = require("request");
const uid = require("uid");

//Razorpay instance
const instance = new Razorpay({
	key_id: process.env.RAZORPAY_API_KEY,
	key_secret: process.env.RAZORPAY_API_SECRET,
});

//Generate order object
exports.generateOrder = (req, res) => {
	const amount = req.body.totalprice;
	try {
		const options = {
			amount: amount * 100, // amount  == Rs 10
			currency: "INR",
			receipt: `receipt#${uid(16)}`,
			payment_capture: 0,
			// 1 for automatic capture // 0 for manual capture
		};
		console.log("options", options);
		instance.orders.create(options, async function (err, order) {
			if (err) {
				console.log("inside", err);
				return res.status(500).json({
					message: "Something Went Wrong",
				});
			}
			return res.status(200).json(order);
		});
	} catch (err) {
		console.log("outside err", err);
		return res.status(500).json({
			message: "Something Went Wrong",
		});
	}
};

//Capture Payment
exports.capturePayment = (req, res) => {
	console.log("request",req.body);
	const url = `https://${process.env.RAZORPAY_API_KEY}:${process.env.RAZORPAY_API_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`;
	try {
		return request(
			{
				method: "POST",
				url: url,
				form: {
					amount: req.body.totalprice * 100, // amount == Rs 10 // Same As Order amount
					currency: "INR",
				},
			},
			function (err, response, body) {
				if (err) {
					return res.status(500).json({
						message: "Something Went Wrong in capture",
					});
				}
				// console.log("Status:", response.statusCode);
				// console.log("Headers:", JSON.stringify(response.headers));
				// const captureData = JSON.parse(body);
				console.log(req.body);
				console.log("ticketData", req.body.bookingDetails.ticketData);
				return res.status(200).json(body);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Something Went Wrong out capture",
		});
	}
};
