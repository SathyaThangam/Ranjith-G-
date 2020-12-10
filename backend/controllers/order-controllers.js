const {
	generateRazorpayOrder,
	capturePaymentRazorpay,
	verifyPaymentRazorPay,
} = require("../services/razorpay-services");

const Order = require("../models/Order");

exports.generateOrder = async (req, res) => {
	const { amount, orders } = req.body;
	console.log(amount);
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
			amount,
		};
		const insertingOrder = await Order.create(order);
		if (insertingOrder) {
			res.status(200).send({
				id: razorpayOrder.id,
				currency: razorpayOrder.currency,
				amount: razorpayOrder.amount,
			});
		} else {
			res.sendStatus(500);
		}
	} catch (error) {
		res.sendStatus(500);
	}
};

exports.getOrdersByUser = async (req, res) => {
	const { email } = res.locals;
	try {
		const orders = await Order.find({ email: email.toLowerCase() }, "-_id");
		res.status(200).send(orders);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

exports.cancelOrder = async (req, res) => {
	const { order_id } = req.body;
	try {
		await Order.updateOne(
			{ order_id },
			{ order_completed_status: "cancelled" }
		);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
};

//Capture Payment
exports.verifyAndCapturePayment = async (req, res) => {
	// console.log("request", req.body);
	const {
		razorpay_order_id,
		razorpay_payment_id,
		razorpay_signature,
	} = req.body.razorpay_data;
	try {
		const isPaymentAuthentic = await verifyPaymentRazorPay(
			req.body.order_id,
			razorpay_payment_id,
			razorpay_signature
		);
		if (isPaymentAuthentic) {
			await capturePaymentRazorpay(
				req.body.total_price,
				razorpay_payment_id
			);
			await Order.updateOne(
				{ order_id: req.body.order_id },
				{ order_completed_status: "success" }
			);
			//update status in DB
			res.sendStatus(200);
		} else {
			await Order.updateOne(
				{ order_id: req.body.order_id },
				{ order_completed_status: "failed" }
			);
			res.sendStatus(403);
		}
	} catch (error) {
		console.log(error);
		await Order.updateOne(
			{ order_id: req.body.order_id },
			{ order_completed_status: "pending" }
		);
		res.sendStatus(500);
	}
};
