const {
	generateRazorpayOrder,
	capturePaymentRazorpay,
} = require("../services/razorpay-services");

const Order = require("../models/Order");

// const {
// 	createNewOrder,
// 	getRouteIDByLocation,
// 	updatePaymentStatusByPaymentID,
// } = require("../helpers/DB-helper");
//Generate order object
exports.generateOrder = async (req, res) => {
	const { price, orders } = req.body;
	const amount = price * 100;
	const { email } = res.locals;
	try {
		const razorpayOrder = await generateRazorpayOrder(amount);
		const order = {
			order_id: razorpayOrder.id,
			email,
			order_details: orders,
			order_completed_status: razorpayOrder.status,
			order_currency: razorpayOrder.currency,
			order_payment_details: razorpayOrder,
		};
		const insertingOrder = await Order.create(order);
		if (insertingOrder) {
			res.status(200).send({ id: razorpayOrder.id });
		} else {
			res.sendStatus(500);
		}
	} catch (error) {
		res.sendStatus(500);
	}
};

//Capture Payment
exports.capturePayment = (req, res) => {
	console.log("request", req.body);
	capturePaymentRazorpay(req.body.totalprice, req.params.paymentId)
		.then((response) => {
			const data = response.data;
			const { status, order_id } = data;
			console.log(response.data);
			updatePaymentStatusByPaymentID(order_id, true);
			res.status(200).json({ status: status, order_id: order_id });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				message: "Something Went Wrong out capture",
			});
		});
};
